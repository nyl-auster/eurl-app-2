<template>
  <div id="app">

    <div class="row header">
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

    <div class="row footer">
      <div class="small-12 columns">
        <site-footer></site-footer>
      </div>
    </div>
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
