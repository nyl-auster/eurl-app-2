<!--
Composant racine de notre simulateur
-->
<template>

  <div id="simulateur">

    <simulateur-form :formValues="params" @onFormValuesUpdated="setParams"></simulateur-form>

    <simulateur-results-synthese :params="params" :Results="Results"></simulateur-results-synthese>

    <!--
    <div class="row">
      <div class="small-12 columns">

        <simulateur-charts :params="params" :Results="Results"></simulateur-charts>

      </div>
    </div>
    -->

    <div class="row">
      <div class="small-12 columns">

        <simulateur-results-table :params="params" :Results="Results"></simulateur-results-table>

      </div>
    </div>

  </div>

</template>

<script>

  import SimulateurForm from "./SimulateurForm"
  import SimulateurResultsTable from "./SimulateurResultsTable"
  import SimulateurResultsSynthese from "./SimulateurResultsSynthese";
  import SimulateurCharts from "./SimulateurCharts";
  import chargesCalculator from "src/services/chargesCalculator";

  export default {
    data: function() {
      return {
        // paramètres de base pour initier le calcul de nos dettes
        params:  {
          chiffreAffaireHt: 0,
          chiffreAffaireTtc: 0,
          bindToCaHt: true,
          bindToFraisHt: true,
          fraisHt: 0,
          fraisTtc: 0,
          cfe: 1000,
          remuneration: 0,
          prevoyance: 'B'
         }
      }
    },
    // calculer les résultats lors de la création de la vue
    created: function() {
      //this.calculateResults();
    },
    computed: {
      Results:function() {
        return chargesCalculator(this.params).getResults();
      }
    },
    methods: {
      // mettre à jour les données de notre simulateur
      setParams:function(formValues) {
         for (const property in formValues) {
            this.params[property] = formValues[property];
         }
         this.calculateResults();
      },
      calculateResults:function() {
        this.Results = chargesCalculator(this.params).getResults();
      }
    },
    components:{
      SimulateurForm,
      chargesCalculator,
      SimulateurResultsTable,
      SimulateurResultsSynthese,
      SimulateurCharts
    }
  }
</script>
