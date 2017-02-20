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
    <simulateur-form :formValues="formValues" @formSubmitted="formSubmitted" />
    <simulateur-results-synthese :Results="Results" />
    <simulateur-results-table :Results="Results" :CalculatorParams="CalculatorParams" />
  </div>
</template>






