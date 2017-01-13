<template>
  <nav class="main-menu">
    <div class="small-12 columns">
      <ul class="vertical medium-horizontal menu">
        <li><router-link to="/">Simulateur</router-link></li>
        <li><router-link to="/aide">Aide</router-link></li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
  ul li {
    display : inline-block;
    margin-right : 0.5rem;
    margin-left : 0.5rem;
    text-transform:uppercase;
  }
</style>
