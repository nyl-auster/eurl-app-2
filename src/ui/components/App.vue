<script>
  import Component from "../controllers/App.js";
  import SiteMenu from './SiteMenu'
  import SiteHeader from './SiteHeader'
  import SiteFooter from './SiteFooter'
  Component.components = { SiteMenu, SiteHeader, SiteFooter }
  export default Component
</script>

<template>
  <div id="app">
    <site-menu></site-menu>
    <router-view></router-view>
    <site-footer></site-footer>
  </div>
</template>
