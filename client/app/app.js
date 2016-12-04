import React from 'react';
import ReactDOM from 'react-dom';
import Login from './components/login';
import Update from './components/update_page';
import View from './components/view_page';
import Header from './components/header';
import { IndexRoute, Router, Route, hashHistory } from 'react-router';


class LoginPage extends React.Component {
  render() {
    return (
        <Login/>
    );
  }
}

class UpdatePage extends React.Component {
  render() {
    return (
      <Update/>
        //<Update/>
    );
  }
}

class ViewPage extends React.Component {
  render() {
    return (
        <View/>
    );
  }
}

/*class HeaderPage extends React.Component {
  render() {
    return (
        <Header/>
    );
  }
}*/

//Rename page to something else
class ModificationPage extends React.Component {
  render() {
    //Page that holds the header in a consistent position while making the view/update/delete a SPA
    return (
      <div>
        <Header/>
        <div>{this.props.children}</div>
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div>{this.props.children}</div>
    );
  }
}

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={LoginPage} />
      <Route path="login" component={LoginPage} />
      <Route path="m" component={ModificationPage} > //RENAME ROUTE PATH
        <IndexRoute component={ViewPage} />
        <Route path="view" component={ViewPage} />
        <Route path="update" component={UpdatePage} />
        //Delete Route
      </Route>
      //<Route path="view" component={ViewPage} />
      //<Route path="update" component={UpdatePage} />
    </Route>
  </Router>
),document.getElementById('main_container'));
