import React from 'react';
import {Link} from 'react-router';
import {getPendingMacros, deletePendingMacro, postJournalEntry} from '../server';

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
        this.refresh();
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
  render(){
    var self = this;
    //Render rows before we put them in (some weird stuff happens if we do it inline)
    var rows = [];
    this.state.contents.map(function(macroObj) {
      rows.push(
        <tr key={macroObj["_id"]}>
          <td>
            {macroObj["macroName"]}
          </td>
          <td>
            {self.getDateFormat(macroObj["created_at"], "date")}
          </td>
          <td>
            {self.getDateFormat(macroObj["created_at"], "time")}
          </td>
          <td>
            {macroObj["author"]}
          </td>
          <td>
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
                      <th>Macro</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Employee</th>
                      <th>Approve/Deny</th>
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
