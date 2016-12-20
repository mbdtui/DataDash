import React from 'react';
import {Link} from 'react-router';
import {getPendingMacros, deletePendingMacro, postJournalEntry, requestDeleteMacroExecution, requestUpdateMacroExecution} from '../server';
import { getUsername, getGroup } from '../credentials.js'

export default class Pending extends React.Component{

  constructor(props) {
    super();
    this.state = {
      contents: [],
      result_message: null
    };
    this.handleResult = this.handleResult.bind(this);
  }
  refresh(){
    getPendingMacros((data) => {
        this.setState({contents: data});
    });
  }
  componentDidMount() {
    this.refresh();
  }

  handleApprovePending(obj){
    var objectID = obj["_id"];
    var user = getUsername();
    var group = getGroup();
    deletePendingMacro(objectID, () => {
      //Make a second xmlhttprequest to update journal
      /*postJournalEntry(obj, () => {*/
      var request_type='approved_peer_review'
      var proposed_macro = {
        macroType: obj["macroType"],
        request_type: obj["request_type"],
        table: obj["macroTable"],
        function_called: obj["macroFunction"],
        params: obj["macroParams"],
        creator: obj["author"],
        created_at: obj["created_at"],
        user: user,
        group: group
      };
      if(obj["macroType"] === 'Delete'){
        requestDeleteMacroExecution(request_type, proposed_macro, (result) => {
          this.handleResult(result);
          this.refresh();
        });
      } else if (obj["macroType"] === 'Update'){
        requestUpdateMacroExecution(request_type, proposed_macro, (result) => {
          this.handleResult(result);
          this.refresh();
        });
      }
      //});
    });
  }
  handleResult(result){
            if(result.status == 'error'){
              console.log(JSON.stringify(result.error));
              this.setState({
                result_message: {
                  type:'error',
                  msg: 'The approved macro has failed to execute! Check the input data!'
                }
              });
            }
            else if(result.status == 'success'){
              console.log(JSON.stringify(result.result));
              this.setState({
                result_message: {
                  type:'success',
                  msg: 'The approved macro has executed successfullly!'
                }
              })
            }
            else if (result.status == 'denial'){
              this.setState({
                result_message: {
                  type:'deny',
                  msg: 'The requested macro has been denied.'
                }
              })
            }
            else{
              this.setState({
                result_message: {
                  type:'wait',
                  msg: 'The approved macro has been sent to your peers for reviewing!'
                }
              })
            }
  }
  handleDenyPending(obj){
    var objectID = obj["_id"];
    console.log(Object.keys(obj));
    var result = {
      status: 'denial'
    };
    deletePendingMacro(objectID, () => {
      this.handleResult(result);
      this.refresh();
    });
  }
  getDateFormat(date, type){
    var date = new Date(date);
    var localeTime = date.toLocaleString();
    var splitTime = localeTime.split(", ");
    //MM/DD/YYYY
    if(type == "date"){
      return splitTime[0];
    }
    //HH/MM/SS p
    if(type == "time"){
      return splitTime[1];
    }
  }
  showMacroDetails(macroObj){
    var message = ("Function : " + macroObj["macroFunction"] + "\n");
    var params = macroObj["macroParams"];
    var keys = Object.keys(params);
    for(var i =0; i<keys.length; i++){
      message = (message + keys[i] + ": " + params[keys[i]] + "\n");
    }
    alert(message);
  }
  render(){
    var self = this;
    //Render rows before we put them in (some weird stuff happens if we do it inline)
    //Probably want to change dialog of the show details
    var rows = [];
    this.state.contents.map(function(macroObj) {
      rows.push(
        <tr key={macroObj["_id"]}>
          <td>
            {macroObj["macroType"]}
          </td>
          <td>
            {macroObj["macroTable"]}
          </td>
          <td>
            <a onClick ={() => self.showMacroDetails(macroObj)}> Show Details </a>
          </td>
          <td>
            <p>{self.getDateFormat(macroObj["created_at"], "date")}</p>
            <p>{self.getDateFormat(macroObj["created_at"], "time")}</p>
          </td>
          <td>
            {macroObj["author"]}
          </td>
          <td id = "MacroReviewTableCell">
            <button onClick={() => self.handleApprovePending(macroObj)}> Approve </button> <button onClick={() => self.handleDenyPending(macroObj)}> Deny </button>
          </td>
        </tr>
      );
    });
    var execution_result = "No message";
    if(this.state.result_message !== null) {
      var result = this.state.result_message;
      if(result.type == 'error') {
        execution_result = <div className="alert alert-danger" role="alert"><img className="gordon" src="./img/gordon.jpg" height="40px" width="40px"/>{result.msg}</div>
      }
      else if(result.type == 'success') {
        execution_result = <div className="alert alert-success" role="alert"><img className="gordon" src="./img/gordon.jpg" height="40px" width="40px"/>{result.msg}</div>
      }
      else {
        execution_result = <div className="alert alert-info" role="alert"><img className="gordon" src="./img/gordon.jpg" height="40px" width="40px"/>{result.msg}</div>
      }
      $("#execution-result").modal("show");
    }
    return(
      <div id="wrapper">
        <div className="modal fade" id="execution-result" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title" id="myModalLabel">MACRO OPERATION INFORMATION</h4>
              </div>
              <div className="modal-body">
                {execution_result}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.handleReadResult}>Close</button>
              </div>
            </div>
          </div>
        </div>
    <div id="page-content-wrapper">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="col-lg-12">
              <h2>View Pending Macros</h2>
            </div>


            <div className="col-lg-12">
              <div className="pending-table scrollTable">
                <table className="sortable">
                  <thead>
                    <tr>
                      <th>Type</th>
                      <th>Table</th>
                      <th>Details</th>
                      <th>Date</th>
                      <th>Employee</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="col-lg-12">
              <center>
                <Link to={"/m/view/"}>
                  <button className="btn btn-secondary btn-lg history-pending-go-back-btn">
                    Go Back
                  </button>
                </Link>
              </center>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    );
  }
}
