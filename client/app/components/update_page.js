import React from 'react';
import {Link} from 'react-router';
import {getMacrosAllTables} from '../server.js';

export default class Update extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      selected_table: '',
      selected_macro: '',
      macros_all_tables: null
    };
    this.sendUpdate = this.sendUpdate.bind(this);
    this.handleTableSelected = this.handleTableSelected.bind(this);
    this.handleMacroSelected = this.handleMacroSelected.bind(this);
  }

  componentDidMount(){
    console.log('Component Mounted');
    getMacrosAllTables((macros_all_tables) => {
      // console.log(JSON.stringify(macros_all_tables));
      this.setState({
        macros_all_tables: macros_all_tables
      });
    })
  }
  handleTableSelected(event){
    event.preventDefault();
    var table_name = event.target.value;
    console.log('Called');
    this.setState({
      selected_table: table_name,
      selected_macro: ''
    });
  }
  handleMacroSelected(event){
    event.preventDefault();
    var macro_name = event.target.value;
    this.setState({
      selected_macro: macro_name
    })
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

  //                     <h3> Update: </h3>
  //                     <select name="update" value={this.state.macro} onChange={this.handleMacroSelected} className="selectpicker options btn btn-default" data-width="75%" title="Select a Run Name">
  //                       {this.state.macros.map((macro, i)=>{
  //                         return <option key={i} value={macro}>{macro}</option>
  //                       })}
  //                     </select>
  render(){
    var tables = [];
    var available_macros = [];
    var parameters = [];
    if (this.state.macros_all_tables !== null) {
      var tableNames = Object.getOwnPropertyNames(this.state.macros_all_tables.update);
      tables = tableNames.map((eachTableName, i) => {
        return <option key={i} value={eachTableName}>{eachTableName}</option>
      });
      if (this.state.selected_table !== '') {
        var macroNames = Object.getOwnPropertyNames(this.state.macros_all_tables.update[this.state.selected_table]);
        available_macros = macroNames.map((eachMacro, i)=>{
          return <option key={i} value={eachMacro}>{eachMacro}</option>
        });
        if (this.state.selected_macro !== '') {
          var parameterNames = this.state.macros_all_tables.update[this.state.selected_table][this.state.selected_macro];
          parameters = parameterNames.map((eachParameter, i) => {
            return <input key={i} type="text" name="by-two" className="form-control" placeholder={eachParameter} aria-describedby="basic-addon1" />
          });
        }
      }
    };

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
                         {tables}
                      </select>
                      <h3> Update: </h3>
                      <select name="update" value={this.state.macro} onChange={this.handleMacroSelected} className="selectpicker options btn btn-default" data-width="75%" title="Select a Run Name">
                        {available_macros}
                      </select>
                      <h3> Parameters: </h3>
                      <div className="input-group">
                        {parameters}
                      </div>
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
