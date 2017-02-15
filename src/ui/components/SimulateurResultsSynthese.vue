<script>
  import Component from "../controllers/SimulateurResultsSynthese.js"
  import YineoTooltip from "./YineoTooltip"
  Component.components = {
    YineoTooltip
  }
  export default Component;
</script>

<template>
  <div class="big-picture">
    <div class="row">

      <div class="small-12 medium-6 columns">
        <h2 class="total-a-provisionner">TOTAL A PROVISIONNER <br/><span class="subheader">HORS REMUNERATION ET FRAIS</span></h2>
        <p>
          <span class="result test--a-provisionner-result">{{ Results.getLine('totalContributions').montant}} €</span>
        </p>
        <yineo-tooltip message="C'est le total de l'argent à mettre de côté pour payer les impots, taxes, cotisations à venir et reverser la TVA en fonction des chiffres que vous avez renseigné.<br/> Ce total n'inclut PAS votre rémunération et vos frais." />


      </div>

      <div class="small-12 medium-6 columns">
        <h2 class="solde">SOLDE RESTANT<br/><span class="subheader">Restera en banque</span><br/></h2>
        <p>
          <span :class="resultClasses" class="result test--solde-result">{{Results.getLine('resteEnBanque').montant}} €</span>
        </p>
        <yineo-tooltip message="C'est ce qu'il restera de votre chiffre d'affaires TTC une fois retiré l'intégralité de ce que votre société doit payer ( rémunération et frais TTC inclus )" />
      </div>

    </div>
  </div>
</template>
