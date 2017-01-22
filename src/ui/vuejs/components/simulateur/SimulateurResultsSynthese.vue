<script>
export default {
  props:['Results', 'params'],
  computed: {
    resultClasses: function() {
      return {
        success:this.Results.getLine('resteEnBanque').montant > 0,
        alert:this.Results.getLine('resteEnBanque').montant < 0,
      }
    }
  }
}
</script>

<template>
  <div class="row big-picture">
    <div class="small-12 medium-6 columns">
      <h2 class="total-a-provisionner">TOTAL A PROVISIONNER <br/><span class="subheader">HORS REMUNERATION ET FRAIS</span></h2>
      <h3>C'est le total de l'argent à provisionner pour pouvoir honorer vos impots et cotisations. Ce total n'inclut donc pas votre rémunération et vos frais.</h3>
      <p>
        <span class="result test--a-provisionner-result">{{ Results.getLine('totalContributions').montant}} €</span>
      </p>
    </div>
    <div class="small-12 medium-6 columns">
      <h2 class="solde">SOLDE RESTANT<br/><br/></h2>
      <h3>C'est ce qu'il restera de votre chiffre d'affaires TTC une fois retiré l'intégralité de ce que votre société doit payer ( rémunération et frais TTC inclus )</h3>
      <p>
        <span :class="resultClasses" class="result test--solde-result">{{Results.getLine('resteEnBanque').montant}} €</span>
      </p>
    </div>
  </div>
</template>
