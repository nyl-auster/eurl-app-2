<script>
  import Component from "../controllers/PageSimulateur.js"
  import Simulateur from './Simulateur'
  Component.components = {
    Simulateur
  }
  export default Component;
</script>

<template>
  <div class="component" id="component--page-simulateur">
    <simulateur />
  </div>
</template>

