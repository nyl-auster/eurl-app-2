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

      <div class="small-12 medium-4 columns">
        <h2 class="total-a-provisionner">TOTAL A PAYER <br/><span class="subheader">PAR VOTRE EURL</span></h2>
        <p>
          <span class="result test--a-provisionner-result">{{ Results.total}} €</span>
        <yineo-tooltip message="C'est la totalité des dépenses de votre société pour payer votre rémunération, les impots, taxes, cotisations à venir, TVA à reverser; en fonction des chiffres que vous avez renseigné." />
        </p>

      </div>
      <hr class="show-for-small-only" />

      <div class="small-12 medium-4 columns">
        <h2 class="total-a-provisionner">TOTAL A PROVISIONNER<br/><span class="subheader">TAXES, TVA, COTISATIONS, IMPÔTS </span></h2>
        <p>
          <span class="result test--a-provisionner-result">{{ Results.getLine('totalContributions').montant}} €</span>
        <yineo-tooltip message="C'est le total de l'argent à mettre de côté pour pouvoir faire face aux impots, taxes, cotisations à venir ainsi que reverser la TVA; en fonction des chiffres que vous avez renseigné. Ce total N'inclut PAS votre rémunération et vos frais." />
        </p>
      </div>

      <hr class="show-for-small-only" />

      <div class="small-12 medium-4 columns">
        <h2 class="solde">BENEFICE<br/><span class="subheader">Restera en banque</span><br/></h2>
        <p>
          <span :class="resultClasses" class="result test--solde-result">{{Results.getLine('resteEnBanque').montant}} €</span>
          <yineo-tooltip message="C'est ce qu'il restera à votre société sur le chiffre d'affaires TTC de départ après avoir tout payé" />
        </p>
      </div>

    </div>
  </div>
</template>
