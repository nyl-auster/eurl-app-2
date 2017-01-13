<template>
  <div id="app">
    <site-header></site-header>
    <site-menu></site-menu>
    <div class="row router-view">
      <div class="small-12 columns">
        <router-view></router-view>
      </div>
    </div>
    <site-footer></site-footer>
  </div>
</template>

<script>
import SiteMenu from './components/site/SiteMenu'
import SiteHeader from './components/site/SiteHeader'
import SiteFooter from './components/site/SiteFooter'

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

.router-view {
  margin-top:1.5rem;
}

</style>
