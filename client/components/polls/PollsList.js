import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Polls } from '../../../imports/collections/Polls';
import { Link } from 'react-router';

class PollsList extends Component {
  renderPolls() {
    return this.props.polls.map(poll => {
      const url = `polls/${poll._id}`;
      return (
        <li className="list-group-item" key={poll._id}>
          <Link to={url}>Poll: {poll.description}</Link>
        </li>
      );
    });
  }

  render() {
    return (
      <ul className="list-group">
        {this.renderPolls()}
      </ul>
    );
  }
}

export default createContainer(() => {
  Meteor.subscribe('allpolls');
  return { polls: Polls.find({}).fetch() };
}, PollsList);
