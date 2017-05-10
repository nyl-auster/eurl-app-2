<script>
  import Component from "../controllers/PageSimulateur.js"
  import Simulateur from './Simulateur'
    import AppWarning from './AppWarning'
  Component.components = {
    Simulateur,
    AppWarning
  }
  export default Component;
</script>

<template>
  <div class="component" id="component--page-simulateur">
    <app-warning />
    <simulateur />
  </div>
</template>

