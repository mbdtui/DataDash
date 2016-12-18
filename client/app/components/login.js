import React from 'react';
import {Link} from 'react-router';

export default class Login extends React.Component{

  render(){
    return(
      <div className="log-in-page">
      	<div className="col-lg-2"></div>
      	<div className="col-lg-8">
      		<img id="LM-login" src="img\liberty_mutual_log_in.jfif" alt="Liberty Mutual Logo"/>
      	</div>
      	<div className="col-lg-2"></div>
      	<div className="col-lg-4"></div>
      	<div className="col-lg-4">
      		<div className="form-group log-in">
      			<label htmlFor="usr">Username or Email:</label>
      			<input type="text" className="form-control" id="usr"/>
      		</div>
      		<div className="form-group log-in">
      			<label htmlFor="pwd">Password:</label>
      			<input type="password" className="form-control" id="pwd"/>
      		</div>
      	</div>
      	<div className="col-lg-4"></div>
      	<div className="col-lg-12">
          <center>
            <Link to={"/m/"}>
      				<button className = "btn btn-secondary btn-lg log-in-btn">Login</button>
      			</Link>
      		</center>
          <br/>
          <center>
            <Link to={"/m/"}>
              <button className = "btn btn-secondary">ModPage(Temporary)</button>
            </Link>
          </center>
      	</div>
      </div>
    );
  }
}
