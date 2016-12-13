import React from 'react';
import {Link} from 'react-router';
import {getPendingMacros} from '../server';

export default class Pending extends React.Component{
  constructor(props) {
    super();
    this.state = {
      contents: []
    };
  }
  refresh(){
    getPendingMacros( (data) => {
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
              <h2>View Pending Macros</h2>
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
                    </tr>
                    {this.state.contents.map(function(macroObj) {
                      return (
                        <tr key={macroObj["ObjectID"]}>
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
                            <button> Approve </button>
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
