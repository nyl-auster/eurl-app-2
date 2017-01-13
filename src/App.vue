<template>
  <div id="app">
    <site-header></site-header>
    <site-menu></site-menu>
    <router-view></router-view>
    <site-footer></site-footer>
  </div>
</template>

<script>
import SiteMenu from './components/SiteMenu'
import SiteMenu from './components/SiteMenu'
import SiteFooter from './components/SiteFooter'

export default {
  components: {
  SiteMenu,
  SiteHeader,
  SiteFooter
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}
</style>
