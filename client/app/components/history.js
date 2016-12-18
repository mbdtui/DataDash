import React from 'react';
import {Link} from 'react-router';
import {getHistory} from '../server';

export default class History extends React.Component{
  constructor(props) {
    super();
    this.state = {
      contents: []
    };
  }
  refresh(){
    getHistory( (data) => {
        this.setState({contents: data});
    });
  }
  componentDidMount() {
    this.refresh();
  }
  getDateFormat(date, type){
    var date = new Date(date);
    var localeTime = date.toLocaleString();
    var splitTime = localeTime.split(", ");
    //in case
    if(localeTime === "Invalid Date"){
      return "";
    }

    if(type == "date"){
      //MM/DD/YYYY
      return splitTime[0];
    } else if(type == "time"){
      //HH:MM:SS
      return splitTime[1];
    }
  }
  render(){
    var self = this;
    var rows = [];
    this.state.contents.map(function(journalObj) {
      rows.push(
        <tr key={journalObj["_id"]}>
          <td>
            {journalObj["macroName"]}
          </td>
          <td>
            {self.getDateFormat(journalObj["created_at"], "date")}
          </td>
          <td>
            {self.getDateFormat(journalObj["created_at"], "time")}
          </td>
          <td>
            {journalObj["author"]}
          </td>
          <td>
            {journalObj["reviewer"]}
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
              <h2>View History of Macros</h2>
            </div>
            <div className="col-lg-12">
              <div className="pending-table scrollTable">
                <table className="sortable">
                  <tbody>
                    <tr>
                      <th>Macro</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Employee</th>
                      <th>Reviewer</th>
                    </tr>
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
