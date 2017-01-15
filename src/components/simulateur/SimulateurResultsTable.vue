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
  }
}
</script>

<template>

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

</style>

