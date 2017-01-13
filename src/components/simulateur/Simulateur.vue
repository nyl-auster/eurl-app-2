<template>

  <div id="simulateur">
    <simulateur-form :formValues="params" @onFormValuesUpdated="onFormValuesUpdated"></simulateur-form>
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
        lines: [],
        params:  {
          chiffreAffaireHt: 0,
          chiffreAffaireTtc: 0,
          bindToCaHt: true,
          bindToFraisHt: true,
          fraisHt: 0,
          fraisTttc: 0,
          cfe: 200,
          remuneration: 0,
          prevoyance: 'B'
         }
      }
    },
    created: function() {
      this.calculateResults();
    },
    methods: {
      // on met à jour l'état de notre composant en fonction
      // des données renseignées dans le formulaire
      onFormValuesUpdated:function(formValues) {
         for (let property in formValues) {
            this.params[property] = formValues[property];
         }
         this.calculateResults();
      },
      calculateResults:function() {
        let calculator = chargesCalculator(this.params);
        let lines = [];
        lines = lines.concat(calculator.getCotisationsSocialesArray());
        lines.push(calculator.getCgsCrds());
        lines.push(calculator.getPrevoyance());
        lines.push(calculator.getImpotSurLesSocietes());
        lines.push(calculator.getTva());
        lines.push(calculator.getCfe());

        this.lines = lines;

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

