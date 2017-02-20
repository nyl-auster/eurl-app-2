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
        </p>
        <yineo-tooltip message="C'est la totalité des dépenses de votre société pour payer votre rémunération, les impots, taxes, cotisations à venir, TVA à reverser; en fonction des chiffres que vous avez renseigné." />


      </div>

      <div class="small-12 medium-4 columns">
        <h2 class="total-a-provisionner">TOTAL A PROVISIONNER<br/><span class="subheader">TAXES, TVA, COTISATIONS, IMPÔTS </span></h2>
        <p>
          <span class="result test--a-provisionner-result">{{ Results.getLine('totalContributions').montant}} €</span>
        </p>
        <yineo-tooltip message="C'est le total de l'argent à mettre de côté pour pouvoir faire face aux impots, taxes, cotisations à venir ainsi que reverser la TVA; en fonction des chiffres que vous avez renseigné.<br/> Ce total N'inclut PAS votre rémunération et vos frais." />



      </div>

      <div class="small-12 medium-4 columns">
        <h2 class="solde">BENEFICE<br/><span class="subheader">Restera sur votre compte pro</span><br/></h2>
        <p>
          <span :class="resultClasses" class="result test--solde-result">{{Results.getLine('resteEnBanque').montant}} €</span>
        </p>
        <yineo-tooltip message="" />
      </div>

    </div>
  </div>
</template>
