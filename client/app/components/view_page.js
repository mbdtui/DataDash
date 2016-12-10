import React from 'react';
import {Link} from 'react-router';
import {getRunStatusCode} from '../server';
import RowData from './TableComponents/RowData.js';
import Table from './TableComponents/Table.js';

export default class View extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      headers: [],
      result: []
    };
    this.sendView = this.sendView.bind(this);
  }
  componentDidMount(){
    // this.sendView();
  }
  sendView(){
    var app_name = 'EDW';//app_name,
    var run_name = 'S_2_O_CL_FA_ISO_NRT';//run_name,
    var run_status_code = null;//run_status_code
    getRunStatusCode(app_name, run_name, run_status_code, (result) => {
      var headers = [];
      // Get all the headers of result.
      for (var property in result[0]) {
        headers.push(property);
      }
      this.setState({
        headers: headers,
        result: result
      });
    });
  }
  render(){
    return(
      <div id="wrapper">
        <div id="page-content-wrapper">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div><Table result={this.state.result}/></div>
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
                    <center><a href="#" role="button" onClick={this.sendView} className="btn btn-secondary btn-lg go-btn">Go</a></center>
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

 // <tbody>
 //            {this.state.result.map((result, i) => {
 //              <tr key={i}>
 //                {this.state.headers.map((header, i) => {
 //                  return <td key={i}>{result[header]}</td>
 //                })}
 //              </tr>
 //            })}
 //          </tbody>