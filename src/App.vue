<template>
  <div id="app">

    <div class="row">
      <div class="small-12 columns">
        <site-header></site-header>
      </div>
    </div>

    <div class="row">
      <div class="small-12 columns">
        <site-menu></site-menu>
      </div>
    </div>

    <div class="row router-view">
      <div class="small-12 columns">
        <router-view></router-view>
      </div>
    </div>

    <div class="row router-view">
      <div class="small-12 columns">
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
#app,h1, h2, h3, h4, h5, h6 {
  font-family: 'Avenir', Helvetica, Arial, sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

h1 {
  font-size:1.9rem;
  text-align:center;
}

h2 {
  font-size:1.3rem;
  text-align:center;
}

h3 {
  font-size:1.2rem;
  text-align:center;
}

.router-view {
  margin-top:1.5rem;
}

</style>
