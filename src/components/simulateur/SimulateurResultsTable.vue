<template>

  <table class="table lines-results">
    <caption>
      Détails des montants à reverser
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
        <th> Montant </th>
      </tr>
    </thead>

    <tbody class="lines-results__result" v-for="(line, $index) in lines">

      <tr class="lines-results__result__total">
        <td> {{line.label}} </td>
        <td class="show-for-large" colspan="6"> {{line.organisme}} </td>
        <td> {{line.montant }} </td>
      </tr>

      <tr class="lines-results__result__details show-for-large" v-for="(tranche, $index) in line.tranchesActives">

        <td colspan="2"></td>
        <td> {{$index + 1}} </td>
        <td> {{tranche.baseCalcul }} </td>
        <td> {{tranche.taux}} <span ng-show="tranche.taux">%</span> </td>
        <td> {{tranche.montant_forfaitaire }}</td>
        <td> {{tranche.plafond == plafondMax ? ' - ' : (tranche.plafond ) }} </td>
        <td> {{tranche.montant }} </td>
      </tr>

    </tbody>


  </table>

</template>

<script>
import chargesConfig from "../../services/chargesConfig";

export default {
  name:'SimulateurResultsTable',
  props:['lines'],
  data:function() {
    return {
      plafondMax:chargesConfig.plafondMax
    }
  }
}
</script>

