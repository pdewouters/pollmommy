import React, { Component, PropTypes } from 'react'
import { browserHistory, Link } from 'react-router'
import { Accounts } from 'meteor/accounts-base'

export default class SignupPage extends Component {
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
    let name = document.getElementById("signup-name").value;
    let email = document.getElementById("signup-email").value;
    let password = document.getElementById("signup-password").value;
    this.setState({error: "test"});
    Accounts.createUser({email: email, username: name, password: password}, (err) => {
      if(err){
        this.setState({
          error: err.reason
        });
      } else {
        browserHistory.push('/login');
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
              <h4 className="modal-title">Sign up</h4>
            </div>
            <div className="modal-body">
              { error.length > 0 ?
                <div className="alert alert-danger fade in">{error}</div>
                :''}
              <form  id="login-form"
                    className="form col-md-12 center-block"
                    onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <input type="text" id="signup-name"
                        className="form-control input-lg" placeholder="name"/>
                </div>
                <div className="form-group">
                  <input type="email" id="signup-email"
                        className="form-control input-lg" placeholder="email"/>
                </div>
                <div className="form-group">
                  <input type="password" id="signup-password"
                        className="form-control input-lg"
                        placeholder="password"/>
                </div>
                <div className="form-group">
                  <input type="submit" id="login-button"
                        className="btn btn-lg btn-primary btn-block"
                        value="Sign Up" />
                </div>
                <div className="form-group">
                  <p className="text-center">
                    Already have an account? Login <Link to="/login">here</Link>
                  </p>
                </div>
              </form>
            </div>
            <div className="modal-footer" style={{borderTop: 0}}></div>
          </div>
        </div>
      </div>
    );
  }
}
