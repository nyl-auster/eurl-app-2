<template>
  <div id="app">
    <site-header></site-header>
    <site-menu></site-menu>
    <router-view></router-view>
  </div>
</template>

<script>
import SiteMenu from './components/SiteMenu'
import SiteHeader from './components/SiteHeader'

export default {
  components: { SiteMenu, SiteHeader }
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
