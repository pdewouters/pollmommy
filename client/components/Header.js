import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Accounts from './Accounts';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: Meteor.userId() !== null,
    };
  }

  render() {
    return (
      <div className="header clearfix">
        <nav className="nav navbar-default">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand">PollMommy</Link>
          </div>
          <ul className="nav navbar-nav">
            <li><Accounts /></li>
            {
              this.state.isAuthenticated
              ? <li><Link to="/mypolls">My Polls</Link></li>
              : ''
            }
            {
              this.state.isAuthenticated
              ? <li><Link to="/polls/new">New Poll</Link></li>
              : ''
            }
          </ul>
        </nav>
      </div>
    );
  }
}

export default Header;
