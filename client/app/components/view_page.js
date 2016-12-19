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
    console.log("Taking in input from user");
    var formData = $('#view-form').serializeArray();
    var appName = formData[0].value;
    var runName = formData[1].value;
    var runStatusCode = formData[2].value;
    console.log(formData);
    //
    // if(appName.length === 0){
    //   runStatusCode = null;
    // }
    // if(runName.length === 0){
    //   runStatusCode = null;
    // }
    // if(runStatusCode.length === 0){
    //   runStatusCode = null;
    // }
    var app_name = appName;
    app_name = 'EDW';
    var run_name = runName;
    run_name = 'S_2_O_CLAIMS_CL_CNTR_NRT';
    var run_status_code = runStatusCode;
    run_status_code = null;

    if(runStatusCode == "") {
      run_status_code = null;
    }
    getRunStatusCode(app_name, run_name, run_status_code, (result) => {
      // console.log(JSON.stringify(result));
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

  scrollFunction() {
      var elmnt = document.getElementById("view-table");
      var x = elmnt.scrollLeft;
      var y = elmnt.scrollTop;
  }
      /** <div id="view-table" onscroll="scrollFunction()"><Table result={this.state.result}/></div> **/

  render(){
    return(
      <div id="wrapper">
        <div id="page-content-wrapper">
          <div className="container-fluid">
            <div className="row">
              <div  id="view-table" onscroll="scrollFunction()">
                <div id="content">
                <Table result={this.state.result}/>
                </div>
              </div>
            </div>
            <div className="row">
              <div className= "col-lg-3"></div>
              <div className= "col-lg-6">
                  <div className="input-group">
                    <center>
                      <form action="" method="post" id="view-form">
                        <h3 id="app-name"> App Name: </h3>
                        <input type="text" name="app_name" className="form-control" placeholder="Enter App Name here" aria-describedby="basic-addon1" />
                        <h3> Run Name: </h3>
                        <input type="text" name="run_name" className="form-control" placeholder="Enter Run Name here" aria-describedby="basic-addon1" />
                        <h3> Run Status Code: </h3>
                        <input type="text" name="run_status_code" className="form-control" placeholder="Enter Run Status Code here" aria-describedby="basic-addon1" />
                        <a href="#" role="button" onClick={this.sendView} className="btn btn-secondary btn-lg go-btn">Go</a>
                      </form>
                    </center>
                  </div>
              </div>
              <div className= "col-lg-3"></div>
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
