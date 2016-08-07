import { Meteor } from 'meteor/meteor';
import { Polls } from '../imports/collections/Polls';

Meteor.startup(() => {
  Meteor.publish('allpolls', function() {
    return Polls.find({});
  });

  Meteor.publish('mypolls', function() {
    return Polls.find({ ownerId: this.userId });
  });
});
