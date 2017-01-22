import React from 'react'
import { Link } from 'react-router'

export default React.createClass({
  render() {
    return (
      <div>

        <h1>Simulateur</h1>
        <ul role="nav">
          <li><Link  to="/simulateur" activeClassName="active">Simulateur</Link></li>
          <li><Link to="/aide" activeClassName="active">Aide</Link></li>
          <li><Link to="/contact" activeClassName="active">Contact</Link></li>
        </ul>

        {/* Les composants apparaitront ici */}
        {this.props.children}

      </div>
    )
  }
})
