import React from 'react';
import {Link} from 'react-router';

export default class Update extends React.Component{

  render(){
    return(
      <div id="wrapper">
        <div id="page-content-wrapper">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
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
                      <h3> Update: </h3>
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
                      <div className="input-group">
                        <span className="input-group" id="basic-addon1"></span>
                        <input type="text" className="form-control" placeholder="Username" aria-describedby="basic-addon1" />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12 view-options-rows">
                      <div className="col-lg-6 row-name">
                        <h3> By: </h3>
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

                      </div>
                      <div className="col-lg-6">
                        <div className="input-group">
                          <span className="input-group" id="basic-addon1"></span>
                          <input type="text" className="form-control" placeholder="Username" aria-describedby="basic-addon1" />
                          </div>
                          <div className="input-group">
                            <span className="input-group" id="basic-addon1"></span>
                            <input type="text" className="form-control" placeholder="Username" aria-describedby="basic-addon1" />
                            </div>
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
