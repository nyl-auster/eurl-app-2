<template>
  <nav class="main-menu">
    <div class="menu-centered">
      <ul class="vertical medium-horizontal menu text-centered">
        <li><router-link exact to="/">Simulateur</router-link></li>
        <li><router-link exact to="/aide">Aide</router-link></li>
        <li><router-link exact to="/apropos">A propos</router-link></li>
        <li><router-link exact to="/contact">Contact & feedback</router-link></li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>

  a {
    text-transform:uppercase;
  }

  a.router-link-active {
    background: #1779ba;
    color: #fefefe;
    border-radius:5px;
    font-weight:bold;
  }

</style>
