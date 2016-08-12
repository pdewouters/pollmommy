import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor'
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './components/App';
import PollsList from './components/polls/PollsList';
import MyPolls from './components/polls/MyPolls';
import PollDetails from './components/polls/PollDetails';
import AddPoll from './components/polls/AddPoll';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={PollsList} />
      <Route path="/login" component={LoginPage} />
      <Route path="/signup" component={SignupPage} />
      <Route path="/mypolls" component={MyPolls} />
      <Route path="/polls/new" component={AddPoll} />
      <Route path="/polls/:pollId" component={PollDetails} />
    </Route>
  </Router>
);

Meteor.startup(() => {
  ReactDOM.render(routes, document.querySelector('.root'));
});
