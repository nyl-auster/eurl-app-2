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
        {/* Le composant racine est App */}
        <Route path="/" component={App}>
          {/* La page par défaut est notre simulateur */}
          <IndexRoute component={PageSimulateur}/>
          {/* Les routes de notre application */}
          <Route path="/simulateur" component={PageSimulateur}/>
          <Route path="/aide" component={PageAide}/>
          <Route path="/contact" component={PageContact}/>
        </Route>
      </Router>
    )
  }
})
