<script>
  import chargesConfig from "../../services/config";

  export default {
    name:'SimulateurResultsTable',
    props:['Results', 'params'],
    data:function() {
      return {
        showDetails:false,
        plafondMax:chargesConfig.plafondMax
      }
    }
  }
</script>

<template>
  <div class="component" id="component--simulateur-results-table">
    <div class="row">
      <div class="small-12 columns">

        <table class="table lines-results">
          <caption>
            A PAYER PAR VOTRE EURL <br/><a class="showDetails" @click="showDetails=!showDetails"> {{showDetails ? 'Masquer' : 'Montrer'}}  les détails des calculs</a>
          </caption>
          <thead>
            <tr>
              <th> Nom </th>
              <th class="show-for-large"> Organisme </th>
              <th class="show-for-large"> Tranche </th>
              <th class="show-for-large"> Tranche Base de calcul </th>
              <th class="show-for-large"> Tranche taux </th>
              <th class="show-for-large"> Tranche forfait </th>
              <th class="show-for-large"> tranche plafond </th>
              <th class="montant"> Montant </th>
            </tr>
          </thead>

          <tbody :class="line.type" class="lines-results__result" v-if="!line.hidden" v-for="(line, $index) in Results.lines">

            <tr>
              <td> {{line.label}} </td>
              <td class="show-for-large" colspan="6"> {{line.organisme}} </td>
              <td class="montant"> {{line.montant }} </td>
            </tr>

            <tr v-show="showDetails" class="lines-results__result__details show-for-large" v-for="(tranche, $index) in line.tranchesActives">

              <td colspan="2"></td>
              <td> {{tranche.label}} </td>
              <td> {{tranche.baseCalcul }} </td>
              <td> {{tranche.taux}} <span v-show="tranche.taux">%</span> </td>
              <td> {{tranche.montant_forfaitaire }}</td>
              <td> {{tranche.plafond == plafondMax ? ' - ' : (tranche.plafond ) }} </td>
              <td class="montant"> {{tranche.montant }} </td>
            </tr>

          </tbody>


        </table>
      </div>
    </div>
  </div>
</template>
