<template>
  <div id="simulateur">
    <simulateur-form @formValuesUpdated="onFormValuesUpdated"></simulateur-form>
    <div class="row">
      <div class="small-12 columns">
        <simulateur-results-table :lines="lines"></simulateur-results-table>
      </div>
    </div>
  </div>
</template>

<script>
  import SimulateurForm from "./simulateurForm"
  import simulateurResultsTable from "./simulateurResultsTable"
  import chargesCalculator from "../../services/chargesCalculator";

  export default {
    data: function() {
      return {
        lines: []
      }
    },
    methods: {
      // réagir au changement de valeur d'un champ de formulaire
      onFormValuesUpdated:function(formValues) {
         this.getResults(formValues);
      },
      getResults:function(params) {
        let calculator = new chargesCalculator(params);
        let lines = [];
        lines = lines.concat(calculator.getCotisationsSocialesArray());
        lines.push(calculator.getCgsCrds());
        lines.push(calculator.getPrevoyance());
        lines.push(calculator.getImpotSurLesSocietes());
        lines.push(calculator.getTva());
        lines.push(calculator.getCfe());

        this.lines = lines;
        console.log(lines);
        // ajout du total à provisionner
        //charges.push(getChargesTotal(charges));
      }
    },
    components:{
      SimulateurForm,
      chargesCalculator,
      simulateurResultsTable
    }
  }
</script>

<style>

</style>

