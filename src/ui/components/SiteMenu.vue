<script>
  import Component from "../controllers/SiteMenu.js"
  Component.components = {}
  export default Component;
</script>

<template>
  <div class="menu">
    <ul class="vertical medium-horizontal menu text-centered">
      <li class="menu__link"><router-link exact to="/">Simulateur</router-link></li>
      <li class="menu__link"><router-link exact to="/aide">Aide</router-link></li>
      <li class="menu__link"><router-link exact to="/apropos">A propos de l'auteur</router-link></li>
      <li class="menu__link"><router-link exact to="/contact">Contact & feedback</router-link></li>
    </ul>
  </div>
</template>
