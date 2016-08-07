import React, { Component, PropTypes } from 'react';

class AddChoice extends Component {
  onChoiceAdd() {
    this.props.onChoiceAdd(this.refs.choice.value);
    this.refs.choice.value = 0;
  }
  render() {
    return (
      <div className="form-group">
        <label htmlFor="description">Choices</label>
        <div className="input-group">
          <input ref="choice" className="form-control" />
          <div className="input-group-btn">
            <input
              type="button"
              onClick={() => this.onChoiceAdd()}
              className="btn btn-default"
              value="Add choice"
            />
          </div>
        </div>
      </div>
    );
  }
}

AddChoice.PropTypes = {
  onChoiceAdd: PropTypes.func.isRequired,
};
export default AddChoice;
