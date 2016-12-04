import React from 'react';
import {Link} from 'react-router';

export default class Login extends React.Component{

  render(){
    return(
      <div id="wrapper">
        <div id="page-content-wrapper">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <nav className="navbar navbar-light bg-faded" id="home_page_navbar">
                  <div className="col-lg-9">
                    <img  id="logo" src="\img\LibertyMutual.png" alt="Liberty Mutual Logo"/>
                  </div>

                  <div className="col-lg-3 top-right-menu">
                    <ul className="nav navbar-nav navbar-right">
                      <li className="dropdown top-dropdown">
                        <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i id="user_icon"></i>Bob Norton <span className="caret"></span></a>
                        <ul className="dropdown-menu">
                          <li><a href="#">Account Settings</a></li>
                          <li><a href="#">Change Environment</a></li>
                          <li><a href="#">Add Driver Rows</a></li>
                          <li><a href="#">View Metadata and Statistics</a></li>
                          <li><a href="#">View Pending Macros</a></li>
                          <li><a href="#">View History</a></li>
                          <li>
                            <Link to={""}>
                              Log Out
                            </Link>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </nav>
                <div className="col-lg-12">
                  <div className="row main-buttons">
                    <div id="main_buttons">
                      <Link to={"/view/"}>
                        <button className = "btn btn-secondary btn-lg main-btn">View</button>
                      </Link>
                      <Link to={"/update/"}>
                				<button className = "btn btn-primary btn-lg main-btn active-btn">Update</button>
                			</Link>
                      <button href="#" role="button" className="btn btn-secondary btn-lg main-btn">Delete</button>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12 view-options-rows">
                    <div className="col-lg-6 row-name">
                      <h3> Table: </h3>
                    </div>
                    <div className="col-lg-6">
                      <select className="selectpicker options" data-width="75%" title="Select a table">
                        <option>Driver Step</option>
                        <option>Driver Step Detail </option>
                        <option>Driver Schedule</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-12 view-options-rows">
                    <div className="col-lg-6 row-name">
                      <h3> Run Name: </h3>
                    </div>
                    <div className="col-lg-6">
                      <select className="selectpicker options" data-width="75%" title="Select a Run Name">
                        <option>Driver Step</option>
                        <option>Driver Step Detail </option>
                        <option>Driver Schedule</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-12 view-options-rows">
                    <div className="col-lg-6 row-name">
                      <h3> Group Number: </h3>
                    </div>
                    <div className="col-lg-6">
                      <select className="selectpicker options" data-width="75%" title="Select a Group Number">
                        <option>Driver Step</option>
                        <option>Driver Step Detail </option>
                        <option>Driver Schedule</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-12 view-options-rows">
                    <div className="col-lg-6 row-name">
                      <h3> Step ID: </h3>
                    </div>
                    <div className="col-lg-6">
                      <select className="selectpicker options" data-width="75%" title="Select a Step ID">
                        <option>Driver Step</option>
                        <option>Driver Step Detail </option>
                        <option>Driver Schedule</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-12 view-options-rows">
                    <div className="col-lg-6 row-name">
                      <h3> Driver Step ID: </h3>
                    </div>
                    <div className="col-lg-6">
                      <select className="selectpicker options" data-width="75%" title="Select a Driver Step ID">
                        <option>Driver Step</option>
                        <option>Driver Step Detail </option>
                        <option>Driver Schedule</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-12">
                  <center><p>Note: This change will be peer reviewed before executed. To bypass peer review check the box below. </p>
                    <form className="bypass-check" action="demo_form.asp" method="get">
                       <input type="checkbox" name="bypass-peer-review" value="Bypass Peer Review"/>Bypass Peer Review<br/>
                    </form>
                     </center>
                  </div>
                  <div className="col-lg-12">
                  <center><a href="#" role="button" className="btn btn-secondary btn-lg go-btn">Go</a></center>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
