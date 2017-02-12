<script>
  import Component from "../controllers/Simulateur.js"
  import SimulateurForm from "../components/SimulateurForm"
  import SimulateurResultsTable from "../components/SimulateurResultsTable"
  import SimulateurResultsSynthese from "../components/SimulateurResultsSynthese"
  Component.components = {
      SimulateurForm,
      SimulateurResultsTable,
      SimulateurResultsSynthese
  }
  export default Component;
</script>

<template>
  <div>
    <simulateur-form />
    <simulateur-results-synthese />
    <simulateur-results-table :Results="Results" />
  </div>
</template>






