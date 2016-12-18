import React from 'react';
import {Link} from 'react-router';
import {getPendingMacros, deletePendingMacro, postJournalEntry, requestDeleteMacroExecution, requestUpdateMacroExecution} from '../server';

export default class Pending extends React.Component{

  constructor(props) {
    super();
    this.state = {
      contents: []
    };
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
    deletePendingMacro(objectID, () => {
      //Make a second xmlhttprequest to update journal
      postJournalEntry(obj, () => {
        var request_type='approved_peer_review'
        var proposed_macro = {
          macroType: obj["macroType"],
          request_type: obj["request_type"],
          table: obj["macroTable"],
          function_called: obj["macroFunction"],
          params: obj["macroParams"]
        };
        console.log("Proposed macro in pending is of type " + obj["macroType"]);
        console.log(JSON.stringify(proposed_macro));
        if(obj["macroType"] === 'Delete'){
          requestDeleteMacroExecution(request_type, proposed_macro, (result) => {
            console.log(JSON.stringify(result));
            this.refresh();
          });
        } else if (obj["macroType"] === 'Update'){
          requestUpdateMacroExecution(request_type, proposed_macro, (result) => {
            console.log(JSON.stringify(result));
            this.refresh();
          });
        }


      });
    });
  }

  handleDenyPending(obj){
    var objectID = obj["_id"];
    console.log(Object.keys(obj));
    deletePendingMacro(objectID, () => {
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
    return(
      <div id="wrapper">
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
                  <button className="btn btn-secondary btn-lg go-btn">
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
