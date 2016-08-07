import React, { Component, PropTypes } from 'react';
import { Pie } from 'react-chartjs';
import randomColor from 'randomcolor';

class PollResults extends Component {
  getData() {
    return this.props.choices.reduce((accum,curr) => {
      accum.push({
        color: randomColor(),
        highlight: randomColor(),
        label: curr.label,
        value: curr.votes,
      });
      return accum;
    }, []);
  }
  render() {
    return (
      <div>
        <Pie data={this.getData()} options={{}} />
      </div>
    );
  }
}

PollResults.propTypes = {
  choices: PropTypes.array.isRequired,
};

export default PollResults;
