<script>
  import Component from "../controllers/App.js";
  import SiteMenu from './SiteMenu'
  import SiteHeader from './SiteHeader'
  import SiteFooter from './SiteFooter'
  import AppVersionNumber from './AppVersionNumber'
  Component.components = {
    SiteMenu,
    SiteHeader,
    SiteFooter,
    AppVersionNumber
  }
  export default Component
</script>

<template>
  <div id="app">
    <site-header></site-header>
    <app-version-number></app-version-number>
    <site-menu></site-menu>
    <router-view></router-view>
    <site-footer></site-footer>
  </div>
</template>
