import React, { Component, PropTypes } from 'react';
import Header from './Header';

function App(props) {
  return (
    <div className="container">
      <Header />
      <div className="jumbotron">
        <h1>Create and share your polls</h1>
      </div>
      {props.children}
    </div>
  );
}

export default App;
