<!--
Composant racine de notre simulateur
-->
<template>

  <div id="simulateur">
    <simulateur-form :formValues="params" @onFormValuesUpdated="setParams"></simulateur-form>
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
  import resultLineInterface from "../../services/resultLineInterface";

  export default {
    data: function() {
      return {
        lines: [],
        // paramètres de base pour initier le calcul de nos dettes
        params:  {
          chiffreAffaireHt: 0,
          chiffreAffaireTtc: 0,
          bindToCaHt: true,
          bindToFraisHt: true,
          fraisHt: 0,
          fraisTtc: 0,
          cfe: 200,
          remuneration: 0,
          prevoyance: 'B'
         }
      }
    },
    // calculer les résultats lors de la création de la vue
    created: function() {
      this.calculateResults();
    },
    methods: {
      // mettre à jour les données de notre simulateur
      setParams:function(formValues) {
         for (let property in formValues) {
            this.params[property] = formValues[property];
         }
         this.calculateResults();
      },
      calculateResults:function() {
        this.lines = chargesCalculator(this.params).getAll();
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

