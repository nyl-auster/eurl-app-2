<script>
  import Component from "../controllers/SimulateurCharts.js"
  import SimulateurPie from "./SimulateurPie"
  Component.components = {}
  export default Component;
</script>

<template>
  <div class="component simulateur-charts">
    <simulateur-pie :chartData="chartData" />
  </div>
</template>
