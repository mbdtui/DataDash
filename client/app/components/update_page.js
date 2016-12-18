import React from 'react';
import {Link} from 'react-router';
import {getMacrosAllTablesUpdate, requestUpdateMacroExecution} from '../server.js';

export default class Update extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      selected_table: '',
      selected_macro: '',
      emergency_check: true,
      macros_all_tables: null
    };
    this.sendUpdate = this.sendUpdate.bind(this);
    this.handleTableSelected = this.handleTableSelected.bind(this);
    this.handleMacroSelected = this.handleMacroSelected.bind(this);
    this.handleParameterChanged = this.handleParameterChanged.bind(this);
    this.handleCheckboxClicked = this.handleCheckboxClicked.bind(this);
  }

  componentDidMount(){
    console.log('Component Mounted');
    getMacrosAllTablesUpdate((macros_all_tables) => {
      // console.log(JSON.stringify(macros_all_tables));
      var tableName = Object.getOwnPropertyNames(macros_all_tables)[0];
      var macro = Object.getOwnPropertyNames(macros_all_tables[tableName])[0];
      this.setState({
        macros_all_tables: macros_all_tables,
        selected_table: tableName,
        selected_macro: macro
      });
    })
  }
  handleTableSelected(event){
    event.preventDefault();
    var table_name = event.target.value;
    console.log('Called');
    this.setState({
      selected_table: table_name,
      selected_macro: Object.getOwnPropertyNames(this.state.macros_all_tables[table_name])[0]
    });
  }
  handleMacroSelected(event){
    event.preventDefault();
    var macro_name = event.target.value;
    this.setState({
      selected_macro: macro_name
    })
  }
  handleParameterChanged(event) {
    event.preventDefault();
    // console.log(JSON.stringify(event));
    var param_value = event.target.value;
    var param_name = event.target.id;
    this.state.macros_all_tables[this.state.selected_table][this.state.selected_macro][param_name] = param_value;
    // this.state. = param_value;
    // console.log(this.state.macros_all_tables.update[this.state.selected_table][this.state.selected_macro][param_name]);
  }
  handleCheckboxClicked() {
    this.setState({
      emergency_check: !this.state.emergency_check
    });
  }

  sendUpdate(){
    var request_type;
    if(this.state.emergency_check) {
      request_type = 'emergency';
    } else {
      request_type = 'peer_review';
    }
    var proposed_macro = {
      request_type: request_type,
      table: this.state.selected_table,
      function_called: this.state.selected_macro,
      params: this.state.macros_all_tables[this.state.selected_table][this.state.selected_macro]
    };
    console.log(JSON.stringify(proposed_macro));
    requestUpdateMacroExecution(request_type, proposed_macro, (result) => {
      console.log(JSON.stringify(result));
    });
  }

  render(){
    var tables = [];
    var available_macros = [];
    var parameters = [];
    if (this.state.macros_all_tables !== null) {
      var tableNames = Object.getOwnPropertyNames(this.state.macros_all_tables);
      tables = tableNames.map((eachTableName, i) => {
        return <option key={i} value={eachTableName}>{eachTableName}</option>
      });
      if (this.state.selected_table !== '') {
        var macroNames = Object.getOwnPropertyNames(this.state.macros_all_tables[this.state.selected_table]);
        available_macros = macroNames.map((eachMacro, i)=>{
          return <option key={i} value={eachMacro}>{eachMacro}</option>
        });
        if (this.state.selected_macro !== '') {
          var parameterNames = Object.getOwnPropertyNames(this.state.macros_all_tables[this.state.selected_table][this.state.selected_macro]);
          parameters = parameterNames.map((eachParameter, i) => {
            return <input key={i} id={eachParameter} onChange={this.handleParameterChanged} type="text" name="by-two" className="form-control" placeholder={eachParameter} aria-describedby="basic-addon1" />
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
                      <div id="parameters" className="input-group">
                        {parameters}
                      </div>
                      <div className="col-lg-12">
                        <center><p>Note: This change will be peer reviewed before executed. To bypass peer review check the box below. </p>
                        <input type="checkbox" checked={this.state.emergency_check} name="bypass-peer-review" value="Bypass Peer Review" onChange={this.handleCheckboxClicked}/>
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
