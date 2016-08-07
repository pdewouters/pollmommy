import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';

class Accounts extends Component {
  componentDidMount() {
    // render the blaze accounts form then fnid the div
    // we just rendered in the render method and place
   // the blaze accounts form in that div
    this.view = Blaze.render(Template.loginButtons,
    ReactDOM.findDOMNode(this.refs.container)
    );
  }

  componentWillUnmount() {
    // find the forms we created and destroy them manually
    Blaze.remove(this.view);
  }
  render() {
    return (
      <div ref="container"></div>
    );
  }
}

export default Accounts;
