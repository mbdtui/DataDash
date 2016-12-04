import React from 'react';
import {Link} from 'react-router';

export default class Header extends React.Component{
//consider putting col-lg-12 and header divs in app.js component
  render(){
    return(
      <div className="col-lg-12">
        <div className="header">
          <nav className="navbar navbar-light bg-faded" id="home_page_navbar">
            <div className="col-lg-9">
              <Link to={"/m/view/"}>
                <img  id="logo" src="\img\LibertyMutual.png" alt="Liberty Mutual Logo"/>
              </Link>
            </div>
            <div className="col-lg-3 top-right-menu">
              <ul className="nav navbar-nav navbar-right">
                <li className="dropdown top-dropdown">
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i id="user_icon"></i>Bob Norton <span className="caret"></span></a>
                  <ul className="dropdown-menu">
                  <li>
                    <Link to={"/pending/"}>
                      View Pending Macros
                    </Link>
                  </li>
                    <li>
                      <Link to={"/history/"}>
                        View History
                      </Link>
                    </li>
                    <li>
                      <Link to={"/login/"}>
                        Log Out
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}
