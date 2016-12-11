import React from 'react';
import {Link} from 'react-router';
import {getHistory} from '../server';

/*$(document).ready( function () {
    $('#historyTable').DataTable(
      {
        paging:true
      }
    );
} );*/

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
  render(){
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
                      <th>Approved/Denied</th>
                    </tr>
                    {this.state.contents.map(function(historyObj) {
                      return (
                        <tr key={historyObj["ObjectID"]}>
                          <td>
                            {historyObj["macroName"]}
                          </td>
                          <td>
                            {historyObj["created_at"]}
                          </td>
                          <td>
                          </td>
                          <td>
                            {historyObj["author"]}
                          </td>
                          <td>
                          </td>
                        </tr>
                      )
                    })}
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
