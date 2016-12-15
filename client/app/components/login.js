import React from 'react';
import {Link} from 'react-router';

export default class Login extends React.Component{

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
                <input type="text" className="form-control" id="usr" />
                <h3>Password:</h3>
                <input type="password" className="form-control" id="pwd" />
                  <center>
                    <Link to={"/m/"}>
                      <button className = "btn btn-secondary btn-lg log-in-btn">Login</button>
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
