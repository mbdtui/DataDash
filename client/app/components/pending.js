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

  handleApprovePending(obj, self){
    var objectID = obj["_id"];
    deletePendingMacro(objectID, () => {
      postJournalEntry(obj, (response) => {
        this.refresh();
      });
      //Something handle callback
      //Make second xml http request here for update history
    });
  }

  handleDenyPending(){

  }
  render(){
    var rows = [];
    this.state.contents.map(function(macroObj) {
      rows.push(
        <tr key={macroObj["_id"]}>
          <td>
            {macroObj["macroName"]}
          </td>
          <td>
            {macroObj["created_at"]}
          </td>
          <td>

          </td>
          <td>
            {macroObj["author"]}
          </td>
          <td>
            <button onClick={() => self.handleApprovePending(macroObj, self)}> Approve </button> <button onClick={(e) => self.handleDenyPending(e)}> Deny </button>
          </td>
        </tr>
      );
    });
    var self = this;
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
/*{this.state.contents.map(function(macroObj) {
  return (
    <tr key={macroObj["_id"]}>
      <td>
        {macroObj["macroName"]}
      </td>
      <td>
        {macroObj["created_at"]}
      </td>
      <td>

      </td>
      <td>
        {macroObj["author"]}
      </td>
      <td>
        <button onClick={() => self.handleApprovePending(macroObj, self)}> Approve </button> <button onClick={(e) => self.handleDenyPending(e)}> Deny </button>
      </td>
    </tr>
  )
})}*/
