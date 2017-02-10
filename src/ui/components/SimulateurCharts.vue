<script>
  import Component from "../controllers/SimulateurCharts.js"
  import SimulateurPie from "../components/SimulateurPie"
  Component.components = {
      SimulateurForm,
      SimulateurResultsTable,
      SimulateurResultsSynthese
  }
  export default Component;
</script>

<template>
  <div class="component simulateur-charts">
    <simulateur-pie :chartData="chartData"></simulateur-pie>
  </div>
</template>
