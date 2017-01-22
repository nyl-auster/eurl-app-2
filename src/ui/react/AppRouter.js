import App from './App';
import PageAide from './components/pages/PageAide'
import PageContact from './components/pages/PageContact'
import PageSimulateur from './components/pages/PageSimulateur'
import React from 'react';
import { IndexRoute, Router, Route, hashHistory } from 'react-router'

export default React.createClass({
  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={PageSimulateur}/>
          <Route path="/simulateur" component={PageSimulateur}/>
          <Route path="/aide" component={PageAide}/>
          <Route path="/contact" component={PageContact}/>
        </Route>
      </Router>
    )
  }
})
