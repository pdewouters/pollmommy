import React, { Component, PropTypes } from 'react';
import { Polls } from '../../../imports/collections/Polls';

class PollChoices extends Component {
  onChoiceVote(choice) {
    this.props.onChoiceVote(choice);
  }

  onChoiceRemove(choice) {
    this.props.onChoiceRemove(choice);
  }

  displayControls(choice) {
    return (
      <span className="pull-right">
        <button
          className="btn btn-danger"
          onClick={() => this.onChoiceRemove(choice)}
        >
          Remove
        </button>
      </span>
    );
  }

  renderChoices() {
    return this.props.choices.map(
      (choice, index) =>
        <li className="list-group-item" key={index}>
          {choice.label} - {choice.votes}
          <span className="pull-right">
            <button
              className="btn btn-primary"
              onClick={() => this.onChoiceVote(choice)}
            >
              Vote
            </button>
          </span>
          {
            this.props.isAuthenticated
            ? this.displayControls(choice)
            : ''
          }
        </li>
      );
  }

  render() {
    return (
      <ul className="list-group">
        {this.renderChoices()}
      </ul>
    );
  }
}

PollChoices.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  choices: PropTypes.array.isRequired,
  onChoiceVote: PropTypes.func,
  onChoiceRemove: PropTypes.func,
};
export default PollChoices;
