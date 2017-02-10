<script>
  import Component from "../controllers/App.js";
  import SiteMenu from './SiteMenu'
  import SiteHeader from './SiteHeader'
  import SiteFooter from './SiteFooter'
  Component.components = {
      SiteMenu,
      SiteHeader,
      SiteFooter
  }
  export default Component
</script>

<template>

  <div id="app" class="app">

    <div class="row">
      <div class="small-12 columns">
        <site-menu></site-menu>
      </div>
    </div>

    <router-view></router-view>

    <div class="row footer">
      <div class="small-12 columns">
        <site-footer></site-footer>
      </div>
    </div>
  </div>

</template>
