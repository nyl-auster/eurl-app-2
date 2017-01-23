import React from 'react'
import SiteMenu from './components/site/SiteMenu'
import SiteHeader from './components/site/SiteHeader'
import SiteFooter from './components/site/SiteFooter'

export default React.createClass({
  render() {
    return (
      <div>
        <SiteHeader />
        <SiteMenu />
        {/* Les composants injectées par react-router apparaitront ici */}
        {this.props.children}
        <SiteFooter />
      </div>
    )
  }
})
