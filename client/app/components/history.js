import React from 'react';
import {Link} from 'react-router';

export default class History extends React.Component{
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
              <div className="pending-table">
                <table className="sortable">
                <tr>
                  <th>Macro</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Employee</th>
                  <th>Approved/Denied</th>
                </tr>
                <tr>
                  <td>EX1</td>
                  <td>10/10/2016</td>
                  <td>09:00</td>
                  <td>Bob Norton</td>
                  <td>Approved</td>
                </tr>
                <tr>
                  <td>EX2</td>
                  <td>10/11/2016</td>
                  <td>13:22</td>
                  <td>Chancellor Bennett</td>
                  <td>Approved</td>
                </tr>
                <tr>
                  <td>EX3</td>
                  <td>10/12/2016</td>
                  <td>10:20</td>
                  <td>Aubrey Graham</td>
                  <td>Denied</td>
                </tr>
                <tr>
                  <td>EX4</td>
                  <td>10/13/2016</td>
                  <td>11:11</td>
                  <td>Shawn Carter</td>
                  <td>Denied</td>
                </tr>
                <tr>
                  <td>EX5</td>
                  <td>10/14/2016</td>
                  <td>21:11</td>
                  <td>Kanye West</td>
                  <td>Approved</td>
                </tr>
                </table>
              </div>            
            </div>

            <div className="col-lg-12">
              <center><a href="\update_page.html" role="button" className="btn btn-secondary btn-lg go-btn">Go Back</a></center>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>

    );
  }
}
