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
  <div id="component--simulateur">
    <simulateur-form :formValues="params" @onFormValuesUpdated="setParams" />
    <simulateur-results-synthese :params="params" :Results="Results" />
    <simulateur-results-table :params="params" :Results="Results" />
  </div>
</template>






