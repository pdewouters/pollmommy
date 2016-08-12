import React, { Component, PropTypes } from 'react';
import { Link, withRouter } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

class Header extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout(e) {
    e.preventDefault();
    Meteor.logout();
    this.props.router.push('/');
  }

  renderAuth() {
    return (
      <ul className="nav navbar-nav">
        <li><Link to={{ pathname: '/login', state: { openModal: true } }}>Log in</Link></li>
        <li><Link to={{ pathname: '/signup', state: { openModal: true } }}>Sign up</Link></li>
      </ul>
    );
  }

  renderMenu() {
    return (
      <ul className="nav navbar-nav">
        <li><Link to="/mypolls">My Polls</Link></li>
        <li><Link to="/polls/new">New Poll</Link></li>
        <li><a href="#" onClick={this.logout}>Logout</a></li>
      </ul>
    );
  }

  render() {
    return (
      <div className="header clearfix">
        <nav className="nav navbar-default">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand">PollMommy</Link>
          </div>
          {
            this.props.userId
            ? this.renderMenu()
            : this.renderAuth()
          }
        </nav>
      </div>
    );
  }
}

export default createContainer(() => {
  return {
    userId: Meteor.userId(),
  };
}, withRouter(Header));
