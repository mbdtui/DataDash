import React from 'react';
import {Link} from 'react-router';
import {login} from '../server';

export default class Login extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      failedAttempt: false,
      submitted: false,
      username: "",
      password: ""
    };
  }

  handleUserChange(e) {
    e.preventDefault();
    this.setState({
      username: e.target.value
    });
  }

  handlePasswordChange(e) {
    e.preventDefault();
    this.setState({
      password: e.target.value
    });
  }

  handleSignIn(e) {
    e.preventDefault();
    this.setState({
      submitted: true
    });
    login(this.state.username, this.state.password, (success) => {
      if (success) {
        this.setState({
          username: "",
          password: "",
          failedAttempt: false,
          submitted: false
        });
        console.log("User login succeeded");
        // User logged in: navigate to /
        this.context.router.push({ pathname: "/" });
      } else {
        // Invalid password or email address. Display message to user.
        console.log("User login failed");
        this.setState({
          failedAttempt: true,
          submitted: false
        });
      }
    })
  }

  render(){
    return(
      <div className="log-in-page">
        <div className="col-lg-2"></div>
        <div id="login-logo" className="col-lg-8">
          <center><img id="LM-login" src="img\liberty_mutual_log_in.jfif" alt="Liberty Mutual Logo"/></center>
        </div>
        <div className="col-lg-4"></div>
        <div className="col-lg-4">

          <div className="panel panel-default">
            <div className="panel-body">
              <div className="form-group log-in">
                <h3>Username or Email:</h3>
                <input type="text" className="form-control" id="usr" value={this.state.username} onChange={(e) => this.handleUserChange(e)} />
                <h3>Password:</h3>
                <input type="password" className="form-control" id="pwd" value={this.state.password} onChange={(e) => this.handlePasswordChange(e)} />
                <center>
                  <Link to={"/m/"}>
                    <button className = "btn btn-secondary btn-lg log-in-btn" onClick={(e) => this.handleSignIn(e)} >Login</button>
                  </Link>
                </center>
              </div>
            </div>
          </div>

        </div>
        <div className="col-lg-4"></div>
      </div>
    );
  }
}
