import React from 'react';
import ReactDOM from 'react-dom';
import Login from './components/login';
import Update from './components/update_page';
import View from './components/view_page';
import { IndexRoute, Router, Route, hashHistory } from 'react-router'


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

class App extends React.Component {
  render() {
    return (
      <div>{this.props.children}</div>
    )
  }
}

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={LoginPage} />
      <Route path="login" component={LoginPage} />
      <Route path="view" component={ViewPage} />
      <Route path="update" component={UpdatePage} />
    </Route>
  </Router>
),document.getElementById('main_container'));
