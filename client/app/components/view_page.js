import React from 'react';
import {Link} from 'react-router';

export default class View extends React.Component{

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
                      <select className="selectpicker options btn btn-default" data-width="75%" title="Select a table">
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
                      <select className="selectpicker options btn btn-default" data-width="75%" title="Select a Run Name">
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
                      <select className="selectpicker options btn btn-default" data-width="75%" title="Select a Group Number">
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
                      <select className="selectpicker options btn btn-default" data-width="75%" title="Select a Step ID">
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
                      <select className="selectpicker options btn btn-default" data-width="75%" title="Select a Driver Step ID">
                        <option>Driver Step</option>
                        <option>Driver Step Detail </option>
                        <option>Driver Schedule</option>
                      </select>
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
      </div>
    );
  }
}
