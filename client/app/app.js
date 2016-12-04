import React from 'react';
import ReactDOM from 'react-dom';
import Login from './components/login';
import Update from './components/update_page';
import View from './components/view_page';
import MacroOptions from './components/macro_options';
import Header from './components/header';
import ViewHistory from './components/history';
import ViewPending from './components/pending';
import { IndexRoute, Router, Route, hashHistory, IndexRedirect } from 'react-router';

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

class PendingPage extends React.Component {
  render() {
    return (
        <ViewPending/>
    );
  }
}

class HistoryPage extends React.Component {
  render() {
    return (
        <ViewHistory/>
    );
  }
}

//Rename page to something else
class ModificationPage extends React.Component {
  render() {
    //SPA for update view and delete
    return (
      <div>
        <MacroOptions/>
        {this.props.children}
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <Header/>
        {this.props.children}
      </div>
    );
  }
}

//Login page should be separate from app
//IndexRoute -> IndexRedirect. Preserves active link but makes url kinda messy (tradeoffs)
ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRedirect to="/m/view"/>
      <Route path="m" component={ModificationPage} > //RENAME ROUTE PATH
        <IndexRedirect to="/m/view" component={ViewPage} />
        <Route path="view" component={ViewPage} />
        <Route path="update" component={UpdatePage} />
        //Delete Route
      </Route>
      <Route path="pending" component={PendingPage} />
      <Route path="history" component={HistoryPage} />
    </Route>
    <Route path="/login" component={LoginPage} />
  </Router>
),document.getElementById('main_container'));

/*
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
*/
