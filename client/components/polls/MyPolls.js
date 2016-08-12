import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Polls } from '../../../imports/collections/Polls';
import { Link } from 'react-router';
import { withRouter } from 'react-router';

class MyPolls extends Component {
  constructor(props) {
    super(props);
    this.state = this.getMeteorData();
  }

  onPollRemove(poll) {
    Meteor.call('polls.remove', poll);
  }

  getMeteorData() {
    return { isAuthenticated: Meteor.userId() !== null };
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

  renderPolls() {
    return this.props.polls.map(poll => {
      const url = `polls/${poll._id}`;
      return (
        <li className="list-group-item" key={poll._id}>
          <Link to={url}>Poll: {poll.description}</Link>
          <span className="pull-right">
            <button
              className="btn btn-danger"
              onClick={() => this.onPollRemove(poll)}
            >
              Remove
            </button>
          </span>
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
  Meteor.subscribe('mypolls');
  return { polls: Polls.find({}).fetch() };
}, withRouter(MyPolls));
