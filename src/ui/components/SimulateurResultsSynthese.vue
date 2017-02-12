<script>
  import Component from "../controllers/SimulateurResultsSynthese.js"
  Component.components = {}
  export default Component;
</script>

<template>
  <div class="big-picture">
    <div class="row">

      <div class="small-12 medium-6 columns">
        <h2 class="total-a-provisionner">TOTAL A PROVISIONNER <br/><span class="subheader">HORS REMUNERATION ET FRAIS</span></h2>
        <h3>C'est le total de l'argent à mettre de côté pour payer les impots, taxes, cotisations à venir et reverser la TVA en fonction des chiffres que vous avez renseigné.<br/> Ce total n'inclut <strong>PAS</strong> votre rémunération et vos frais.</h3>
        <p>
          <span class="result test--a-provisionner-result">{{ Results.getLine('totalContributions').montant}} €</span>
        </p>
      </div>

      <div class="small-12 medium-6 columns">
        <h2 class="solde">SOLDE RESTANT<br/><br/></h2>
        <h3>C'est ce qu'il restera de votre chiffre d'affaires TTC une fois retiré l'intégralité de ce que votre société doit payer ( rémunération et frais TTC inclus )<br/><br /></h3>
        <p>
          <span :class="resultClasses" class="result test--solde-result">{{Results.getLine('resteEnBanque').montant}} €</span>
        </p>
      </div>

    </div>
  </div>
</template>
