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
              <div className="pending-table">
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
                        </tr>
                      )
                    })}


                    <tr>

                      <td>EX1</td>
                      <td>10/10/2016</td>
                      <td>09:00</td>
                      <td>Bob Norton</td>
                    </tr>
                    <tr>
                      <td>EX2</td>
                      <td>10/11/2016</td>
                      <td>13:22</td>
                      <td>Chancellor Bennett</td>
                    </tr>
                    <tr>
                      <td>EX3</td>
                      <td>10/12/2016</td>
                      <td>10:20</td>
                      <td>Aubrey Graham</td>
                    </tr>
                    <tr>
                      <td>EX4</td>
                      <td>10/13/2016</td>
                      <td>11:11</td>
                      <td>Shawn Carter</td>
                    </tr>
                    <tr>
                      <td>EX5</td>
                      <td>10/14/2016</td>
                      <td>21:11</td>
                      <td>Kanye West</td>
                    </tr>
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
