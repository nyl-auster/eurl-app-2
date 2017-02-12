<script>
  import Component from "../controllers/PageSimulateur.js"
  import Simulateur from './Simulateur'
  Component.components = {
    Simulateur
  }
  export default Component;
</script>

<template>
  <div class="component row" id="component--page-simulateur">
    <div class="row">
      <div class="small-12 columns">
        <simulateur></simulateur>
      </div>
    </div>
  </div>
</template>

