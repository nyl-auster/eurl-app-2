<script>
  import Component from "../controllers/AppMenu.js"
  Component.components = {}
  export default Component;
</script>

<template>
    <div class="navigation row">
      <div class="small-12 columns">
        <div class="menu-centered">
          <ul class="vertical medium-horizontal menu text-centered">
            <li><router-link exact to="/">Simulateur</router-link></li>
            <li><router-link exact to="/aide">Aide</router-link></li>
            <li><router-link exact to="/apropos">A propos de l'auteur</router-link></li>
            <li><router-link exact to="/contact">Contact & feedback</router-link></li>
            <li><router-link exact to="/blog">Blog</router-link></li>
          </ul>
        </div>
      </div>
    </div>
</template>
