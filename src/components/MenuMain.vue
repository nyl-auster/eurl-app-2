<template>
  <nav class="main-menu">
    <div class="small-12 columns">
      <ul class="vertical medium-horizontal menu">
        <router-link to="/">Simulateur</router-link>
        <router-link to="/aide">Aide</router-link>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'menu-main',
  data () {
    return {}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
