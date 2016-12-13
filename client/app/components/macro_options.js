import React from 'react';
import {Link} from 'react-router';

export default class MacroOptions extends React.Component{

  render(){
    return(
      <div className="col-lg-12">
        <div className="header">
          <div className="col-lg-12">
            <div className="row main-buttons">
              <div id="main_buttons">
                <Link to={"/m/view/"} activeClassName="btn-primary btn-lg active-btn" className= "btn btn-secondary btn-lg main-btn">
                  View
                </Link>
                <Link to={"/m/update/"} activeClassName="btn-primary btn-lg active-btn" className= "btn btn-secondary btn-lg main-btn">
                  Update
                </Link>
                <Link to={"/m/delete/"} activeClassName="btn-primary btn-lg active-btn" className= "btn btn-secondary btn-lg main-btn">
                  Delete
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
