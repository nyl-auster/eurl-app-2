<template>
  <div class="menu-centered">
    <ul class="vertical medium-horizontal menu text-centered">
      <li><router-link exact to="/">Simulateur</router-link></li>
      <li><router-link exact to="/aide">Aide</router-link></li>
      <li><router-link exact to="/apropos">A propos de l'auteur</router-link></li>
      <li><router-link exact to="/contact">Contact & feedback</router-link></li>
    </ul>
  </div>
</template>

<style scoped>

  a {
    text-transform:uppercase;
  }

  a.router-link-active {
    border-bottom: solid #1779ba 1px;
  }

</style>
