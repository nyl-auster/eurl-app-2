<script>
import chargesConfig from "../../services/config";

export default {
  name:'SimulateurResultsTable',
  props:['Results'],
  data:function() {
    return {
      showDetails:false,
      plafondMax:chargesConfig.plafondMax
    }
  },
  computed:{
    resultClasses: function() {
    return {
        alert:this.Results.getLine('resteEnBanque').montant < 0,
        success:this.Results.getLine('resteEnBanque').montant > 0
      }
    }
  }
}
</script>

<template>
  <div class="results">

    <div class="row big-picture">
      <div class="small-12 medium-6 columns">
        <h2> Dettes <span class="subheader">hors rémunération </span></h2>
        <p>
          <span class="result">{{Results.getLine('totalDettes').montant}}</span>
        </p>
      </div>
      <div class="small-12 medium-6 columns">
        <h2>Solde prévisionnel</h2>
        <p>
          <span :class="resultClasses" class="result">{{Results.getLine('resteEnBanque').montant}}</span>
        </p>
      </div>
    </div>

    <table class="table lines-results">
      <caption>
        DETTES <a class="showDetails" @click="showDetails=!showDetails"> <br/> {{showDetails ? 'Masquer' : 'Montrer'}} les détails des calculs</a>
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
          <td> {{$index + 1}} </td>
          <td> {{tranche.baseCalcul }} </td>
          <td> {{tranche.taux}} <span v-show="tranche.taux">%</span> </td>
          <td> {{tranche.montant_forfaitaire }}</td>
          <td> {{tranche.plafond == plafondMax ? ' - ' : (tranche.plafond ) }} </td>
          <td class="montant"> {{tranche.montant }} </td>
        </tr>

      </tbody>


    </table>
  </div>
</template>

<style scoped>

  .total, .subtotal {
    font-weight:bold;
  }

  table {
    border-collapse:collapse;
    border: solid black 1px;
  }

  .showDetails {
    font-weight: normal;
  }

  table tr:nth-of-type(even) {
    background-color: transparent !important;
  }

  .lines-results__result__details {
    font-style: italic;
    color: #888;
    font-size: .9em;
  }

  .lines-results__result__total td {
    border-top: 1px solid #BBB;
  }

  .montant {
    text-align:right;
  }

  .big-picture {
    border-top:1px solid silver;
    border-bottom:1px solid silver;
    margin:2rem;
    text-align:center;
    padding:1rem;
    padding-top:1.2rem;
  }

  .big-picture h2 {
    text-transform:uppercase;
    font-weight:bold
  }

  .big-picture .result {
    font-weight:bold;
    font-size:2rem;
  }

  .result {
    color:inherit;
  }

  .result.success {
    color:green;
    transition:all 1s;
  }

  .result.alert {
    color:red;
    transition:all 1s;
  }

</style>

