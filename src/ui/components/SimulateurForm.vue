<script>
  import Component from "../controllers/Simulateurform.js"
  import YineoTooltip from "./YineoTooltip"
  Component.components = {
    YineoTooltip
  }
  export default Component;
</script>

<template>
  <form class="simulator-form" autocomplete="nope!">
    <div class="row">
      <div class="small-12 columns text-center">
        <strong>Entrez ci-dessous les chiffres correspondant à vos estimations sur une période d'un an.</strong><br /><br />
        <!--
        <div v-show="showHelp" class="callout text-center">
          <button @click="showHelp = ! showHelp" class="close-button" aria-label="Close alert" type="button">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        -->
      </div>
    </div>

    <div class="row">


      <!-- Chiffres d'affaires HT -->
      <div class="large-3 small-12 columns">
        <div class="row">
          <div class="small-10 columns">
            <label for="chiffre-affaire-ht">CHIFFRE AFFAIRE HORS TAXE</label>
            <input id="chiffre-affaire-ht" v-model.number="formValues.chiffreAffaireHt" type="number">
          </div>

          <div class="small-2 columns">
            <yineo-tooltip message="Votre chiffre d'affaires sans la TVA de vos ventes. C'est une base de calcul pour certaines des charges." />
          </div>
        </div>
      </div>

      <!-- Chiffre d'affaire TTC -->
      <div class="large-3 small-12 columns">
        <div class="row">
          <div class="small-10 columns">
            <label for="chiffre-affaire-ttc">CHIFFRE AFFAIRE TTC
              <input v-model.number="formValues.chiffreAffaireTtc" type="number" id="chiffre-affaire-ttc">
            </label>
            <div class="simulator-form__field__description">
              <input type="checkbox" v-model.number="formValues.bindToCaHt"> <em> à 20% du HT</em> <br>
            </div>
          </div>

          <div class="small-2 columns">
            <yineo-tooltip message="Votre chiffre d'affaires AVEC la TVA."/>

          </div>

        </div>
      </div>

      <!-- frais HT -->
      <div class="large-3 small-12 columns">
        <div class="row">
          <div class="small-10 columns">
            <label for="frais-ht"> FRAIS HT
              <input v-model="formValues.fraisHt" type="number" id="frais-ht">
            </label>
          </div>
          <div class="small-2 columns">
            <yineo-tooltip message="Vos dépenses de sociétés HORS-TAXE : expertise comtpable, achats, fournisseurs etc ..."/>
          </div>
        </div>
      </div>

      <!-- frais TTC-->
      <div class="large-3 small-12 columns">
        <div class="row">

          <div class="small-10 columns">
            <label for="frais-ttc"> FRAIS TTC </label>
            <input v-model="formValues.fraisTtc" type="number" id="frais-ttc" class="form-control">
            <div class="simulator-form__field__description">
              <input type="checkbox" v-model="formValues.bindToFraisHt">
              <em> à 20% du HT</em> <br>
            </div>
          </div>

          <div class="small-2 columns">
            <yineo-tooltip message="Vos dépenses de sociétés avec la TVA" />
          </div>

        </div>
      </div>

    </div>

    <div class="row">
      <!-- CFE -->
      <div class="large-3 small-12 columns">
        <div class="row">
          <div class="small-10 columns">
            <label for="cfe"> CFE
            </label>
            <input v-model="formValues.cfe" type="number" id="cfe" placeholder="CFE">
          </div>
          <div class="small-2 columns">
            <yineo-tooltip message="Vous devez verser une cotisation foncière des entreprises, dont le montant dépend de votre commune."/>
          </div>
        </div>
      </div>

      <!-- Rémunération -->
      <div class="large-3 small-12 columns">
        <div class="row">
          <div class="small-10 columns">
            <label for="remuneration"> REMUNERATION</label>
            <input v-model="formValues.remuneration" id="remuneration" type="number" placeholder="Rémunération">
          </div>
          <div class="small-2 columns">
            <yineo-tooltip message="Votre rémunération en tant que gérant. Les cotisations sociales sont calculées sur cette base."/>
          </div>
        </div>
      </div>

      <div class="large-3 small-12 columns">
        <div class="row">
          <div class="small-10 columns">
            <label> PREVOYANCE</label>
            <select id="prevoyance" v-model="formValues.prevoyance" type="number">
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
          </div>
          <div class="small-2 columns">
            <yineo-tooltip message="Assurance vie"/>
          </div>
        </div>
      </div>

      <div class="large-3 small-12 columns">
        <div class="row">
          <div class="small-10 columns">
            <br />
            <input
              :class="{ secondary: submitted && !formValuesChanged }"
              @click.prevent="submit()"
              class="button submit-button"
              type="submit"
              :value="'Calculer' + submitButtonSuffix"/>
          </div>
          <div class="small-2 columns"></div>
        </div>
      </div>

    </div>
  </form>
</template>
