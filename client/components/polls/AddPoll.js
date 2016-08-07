import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Polls } from '../../../imports/collections/Polls';
import { browserHistory } from 'react-router';

class AddPoll extends Component {
  onSubmit(e) {
    e.preventDefault();
    if (this.refs.description.value === '') {
      return;
    }

    const poll = {
      description: this.refs.description.value,
      choices: [],
    };
    Meteor.call('polls.insert', poll, (error, pollId) => {
      browserHistory.push(`/polls/${pollId}`);
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={e => this.onSubmit(e)}>
          <div className="form-group">
            <label htmlFor="description">Poll description</label>
            <input id="description" type="text" ref="description" className="form-control" />
          </div>
          <input
            className="btn btn-primary"
            type="submit"
            value="Create Poll"
          />
        </form>
      </div>
    );
  }
}

export default AddPoll;
