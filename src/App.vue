<template>
  <div id="app">
    <site-header></site-header>
    <site-menu></site-menu>
    <div class="row">
      <router-view></router-view>
    </div>
    <site-footer></site-footer>
  </div>
</template>

<script>
import SiteMenu from './components/SiteMenu'
import SiteHeader from './components/SiteHeader'
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

h1, h2, h3, h4, h5, h6 {
  text-transform:uppercase;
}
</style>
