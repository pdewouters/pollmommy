import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Polls } from '../../../imports/collections/Polls';
import { withRouter } from 'react-router';

class AddPoll extends Component {
  constructor(props) {
    super(props);
    this.state = this.getMeteorData();
  }

  getMeteorData() {
    return { isAuthenticated: Meteor.userId() !== null };
  }

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
      this.props.router.push(`/polls/${pollId}`);
    });
  }

  componentWillMount() {
    if (! this.state.isAuthenticated) {
      this.props.router.push('/login');
    }
  }

  componentDidUpdate(prevProps, prevState){
    if (!this.state.isAuthenticated) {
      this.props.router.push('/login');
    }
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

export default withRouter(AddPoll);
