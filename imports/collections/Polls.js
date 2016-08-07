import { Mongo } from 'meteor/mongo';

Meteor.methods({
  'polls.insert': function(poll) {
    return Polls.insert({
      createdAt: new Date(),
      description: poll.description,
      choices: poll.choices, // [{label:'choice 1', votes: 4}]
      ownerId: this.userId,
    });
  },
  'polls.remove': function(poll) {
    return Polls.remove(poll);
  },
  'poll.removeChoice': function(poll, choice) {
    return Polls.update(poll._id, { $pull: { choices: { label: choice.label } } });
  },
  'poll.addVote': function(poll, choice) {
    const label = choice.label;
    return Polls.update({ "choices.label": label}, { $inc: { "choices.$.votes": 1 } });
  },
  'poll.addChoice': function(poll, choice) {
    return Polls.update(poll._id, { $push: { choices: { label: choice.label, votes: 0 } } });
  },
});

export const Polls = new Mongo.Collection('polls');
