import React from 'react';
import {Link} from 'react-router';
import {getMacrosForTableUpdate, getMacrosForTableDelete} from '../server.js';

export default class Update extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      selected_table: '',
      selected_macro: '',
      macros: []
    };
    this.sendUpdate = this.sendUpdate.bind(this);
    this.handleTableSelected = this.handleTableSelected.bind(this);
  }

  componentDidMount(){
  }
  handleTableSelected(event){
    event.preventDefault();
    var table_name = event.target.value;
    if(table_name === '') {
      this.setState({
        selected_table: '',
        selected_macro: '',
        macros: []
      });
      return;
    }
    getMacrosForTableUpdate(table_name, (macros) => {
      console.log(JSON.stringify(macros));
      this.setState({
        selected_table: table_name,
        macros: macros.macros
      });
    });
  }

  sendUpdate(){
    console.log("Taking in input from user");
    var formData = $('#update-form').serializeArray();
    var table = formData[0].value;
    var update = formData[1].value;
    var GroupNumber = formData[2].value;
    var By = formData[2].value;
    console.log(formData);

    // getRunStatusCode(app_name, run_name, run_status_code, (result) => {
    //   console.log(JSON.stringify(result));
    //   var headers = [];
    //   // Get all the headers of result.
    //   for (var property in result[0]) {
    //     headers.push(property);
    //   }
    //   this.setState({
    //     headers: headers,
    //     result: result
    //   });
    // });
  }
  render(){
    return(
      <div id="wrapper">
        <div id="page-content-wrapper">
          <div className="container-fluid">
            <div className="row">
              <div className= "col-lg-3"></div>
              <div className= "col-lg-6">
                <div className="input-group">
                  <center>
                    <form action="" method="post" id="update-form">
                      <h3> Table: </h3>
                      <select name="table" value={this.state.table} onChange={this.handleTableSelected} className="selectpicker options btn btn-default" data-width="75%" title="Select a table">
                        <option value=""></option>
                        <option value="c_driver_step">Driver Step</option>
                        <option value="c_driver_step_detail">Driver Step Detail </option>
                        <option value="c_driver_schedule">Driver Schedule</option>
                      </select>
                      <h3> Update: </h3>
                      <select name="update" value={this.state.macro} onChange={this.handleMacroSelected} className="selectpicker options btn btn-default" data-width="75%" title="Select a Run Name">
                        {this.state.macros.map((macro, i)=>{
                          return <option key={i} value={macro}>{macro}</option>
                        })}
                      </select>
                      <h3> Group Number: </h3>
                      <input type="text" name="Group-Number" className="form-control" placeholder="Username" aria-describedby="basic-addon1" />
                      <h3> By: </h3>
                      <select id="by" name="By" className="selectpicker options btn btn-default" data-width="75%" title="Select a Step ID">
                        <option>Run Name and Driver Step Detail ID</option>
                        <option>Run Name and Group Number</option>
                      </select>
                      <input type="text" name="by-one" className="form-control" placeholder="First by" aria-describedby="basic-addon1" />
                      <input type="text" name="by-two" className="form-control" placeholder="Second by" aria-describedby="basic-addon1" />
                      <div className="col-lg-12">
                        <center><p>Note: This change will be peer reviewed before executed. To bypass peer review check the box below. </p>
                        <input type="checkbox" name="bypass-peer-review" value="Bypass Peer Review"/>
                      </center>
                    </div>
                    <div className="col-lg-12">
                      <a href="#" role="button" onClick={this.sendUpdate} className="btn btn-secondary btn-lg go-btn">Go</a>
                    </div>
                  </form>
                </center>
              </div>

              <div className= "col-lg-3"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
}
