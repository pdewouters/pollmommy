import React, { Component, PropTypes } from 'react';
import PollChoices from './PollChoices';
import { createContainer } from 'meteor/react-meteor-data';
import { Polls } from '../../../imports/collections/Polls';
import PollResults from './PollResults';
import AddChoice from './AddChoice';
import { Meteor } from 'meteor/meteor';

class PollDetails extends Component {
  constructor(props) {
    super(props);
    this.onChoiceRemove = this.onChoiceRemove.bind(this);
    this.onChoiceVote = this.onChoiceVote.bind(this);
    this.onChoiceAdd = this.onChoiceAdd.bind(this);
    this.state = {
      isAuthenticated: Meteor.userId() !== null,
    };
  }

  onChoiceAdd(value) {
    if (value === '') {
      return;
    }
    const choice = {
      label: value,
      votes: 0,
    };

    Meteor.call('poll.addChoice', this.props.poll, choice);
  }

  onChoiceVote(choice) {
     Meteor.call('poll.addVote', this.props.poll, choice);
  }

  onChoiceRemove(choice) {
    Meteor.call('poll.removeChoice', this.props.poll, choice);
  }

  render() {
    if (this.props.loading) {
      return <div>Loading...</div>;
    }

    const { description, choices } = this.props.poll;
    return (
      <div>
        <h5>Poll: {description}</h5>
        <div className="col-md-6">
          <PollChoices
            isAuthenticated={this.state.isAuthenticated}
            choices={choices}
            onChoiceRemove={this.onChoiceRemove}
            onChoiceVote={this.onChoiceVote}
          />
          {
            this.state.isAuthenticated
            ? <AddChoice onChoiceAdd={this.onChoiceAdd} />
            : ''
          }
        </div>
        <div className="col-md-6">
          <PollResults choices={choices} />
        </div>
      </div>
    );
  }
}

PollDetails.propTypes = {
  poll: PropTypes.object,
  loading: PropTypes.bool,
};

export default createContainer(({ params }) => {
  const subscription = Meteor.subscribe('allpolls');
  const loading = !subscription.ready();
  const poll = Polls.findOne(params.pollId);
  return { loading, poll };
}, PollDetails);
