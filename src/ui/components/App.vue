<script>
  import Component from "../controllers/App.js";
  import AppMenu from './AppMenu'
  import AppHeader from './AppHeader'
  import AppFooter from './AppFooter'
  import AppVersionNumber from './AppVersionNumber'
  import AppWarning from './AppWarning'
  Component.components = {
    AppMenu,
    AppHeader,
    AppFooter,
    AppVersionNumber,
    AppWarning
  }
  export default Component
</script>

<template>
  <div id="app">
    <app-header />
    <app-version-number />
    <app-menu />
    <app-warning />
    <router-view />
    <app-footer />
  </div>
</template>
