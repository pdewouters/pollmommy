import React, { Component, PropTypes } from 'react'
import { browserHistory, Link } from 'react-router'
import { createContainer } from 'meteor/react-meteor-data'

export default class LoginPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      error: '',
      modalOpen: this.props.location.state.openModal,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onModalDismiss = this.onModalDismiss.bind(this);
  }

  onModalDismiss() {
    this.setState({
      modalOpen: false,
    });
    browserHistory.push('/');
  }

  handleSubmit(e){
    e.preventDefault();
    let email = document.getElementById('login-email').value;
    let password = document.getElementById('login-password').value;
    Meteor.loginWithPassword(email, password, (err) => {
      if(err){
        this.setState({
          error: err.reason
        });
      } else {
        browserHistory.push('/');
      }
    });
  }

  render(){
    const error = this.state.error;
    const classes = `modal ${this.state.modalOpen ? 'show' : 'hide'}`;
    return (
      <div className={classes}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
            <button type="button" className="close"  onClick={this.onModalDismiss} aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title">Log in</h4>
            </div>
            <div className="modal-body">
              { error.length > 0 ?
                <div className="alert alert-danger fade in">{error}</div>
                :''}
              <form  id="login-form"
                    className="form col-md-12 center-block"
                    onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <input type="email"
                        id="login-email"
                        className="form-control input-lg"
                        placeholder="email"/>
                </div>
                <div className="form-group">
                  <input type="password"
                        id="login-password"
                        className="form-control input-lg"
                        placeholder="password"/>
                </div>
                <div className="form-group text-center">
                  <input type="submit"
                        id="login-button"
                        className="btn btn-primary btn-lg btn-block"
                        value="Login" />
                </div>
                <div className="form-group text-center">
                  <p className="text-center">
                    Don't have an account? Register <Link to="/signup">here</Link>
                  </p>
                </div>
              </form>
            </div>
            <div className="modal-footer" style={{borderTop: 0}}>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
