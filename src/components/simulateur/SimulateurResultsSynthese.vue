<script>
export default {
  props:['Results', 'params'],
  computed: {
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
  <div class="row big-picture">
    <div class="small-12 medium-6 columns">
      <h2>TOTAL A PROVISIONNER <br/><span class="subheader">HORS REMUNERATION ET FRAIS</span></h2>
      <h3>C'est le total de l'argent à provisionner pour pouvoir honorer vos impots et cotisations. Ce total n'inclut donc pas votre rémunération et vos frais.</h3>
      <p>
        <span class="result">{{ Results.getLine('totalContributions').montant}} €</span>
      </p>
    </div>
    <div class="small-12 medium-6 columns">
      <h2>SOLDE RESTANT<br/><br/></h2>
      <h3>C'est ce qu'il restera de votre chiffre d'affaires TTC une fois retiré l'intégralité de ce que votre société doit payer ( rémunération et frais TTC inclus )</h3>
      <p>
        <span :class="resultClasses" class="result">{{Results.getLine('resteEnBanque').montant}} €</span>
      </p>
    </div>
  </div>
</template>

<style scoped>
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
