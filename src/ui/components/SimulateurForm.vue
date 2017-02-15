<script>
  import Component from "../controllers/Simulateurform.js"
  Component.components = {}
  export default Component;
</script>

<template>
  <form class="simulator-form">
    <div class="row">
      <div class="small-12 columns">
        <div v-show="showHelp" class="callout text-center">
          <button @click="showHelp = ! showHelp" class="close-button" aria-label="Close alert" type="button">
            <span aria-hidden="true">&times;</span>
          </button>
          <strong>Entrez ci-dessous les chiffres correspondant à vos estimations sur une période d'un an.</strong>
        </div>
      </div>
    </div>

    <div class="row">

      <!-- Chiffres d'affaires HT -->
      <div class="large-3 small-12 columns">
        <label for="chiffre-affaire-ht">Chiffre d'affaires HT</label>
        <input id="chiffre-affaire-ht" v-model.number="formValues.chiffreAffaireHt" type="number">
        <div class="simulator-form__field__description">
          Votre chiffre d'affaires sans la TVA de vos ventes. C'est une base de calcul pour certaines des charges.
        </div>
      </div>

      <!-- Chiffre d'affaire TTC -->
      <div class="large-3 small-12 columns">
        <label for="chiffre-affaire-ttc">Chiffre d'affaires TTC</label>
        <input v-model.number="formValues.chiffreAffaireTtc" type="number" id="chiffre-affaire-ttc" :disabled="formValues.bindToCaHt">
        <div class="simulator-form__field__description">
          <input type="checkbox" v-model.number="formValues.bindToCaHt"> <em>automatiquement à 20% du HT</em> <br>
          Le total des ventes de la société en incluant la TVA.
        </div>
      </div>

      <!-- frais HT -->
      <div class="large-3 small-12 columns">
        <label for="frais-ht"> Frais HT </label>
        <input v-model="formValues.fraisHt" type="number" id="frais-ht">
        <div class="simulator-form__field__description">
          Vos dépenses de sociétés <strong>hors taxe</strong> : expertise comtpable, achats, fournisseurs etc ...
        </div>
      </div>

      <!-- frais TTC-->
      <div class="large-3 small-12 columns">
        <label for="frais-ttc"> Frais TTC </label>
        <input v-model="formValues.fraisTtc" type="number" id="frais-ttc" class="form-control" :disabled="formValues.bindToFraisHt">
        <div class="simulator-form__field__description">
          <input type="checkbox" v-model="formValues.bindToFraisHt">
          <em>automatiquement à 20% du HT</em> <br>
          <div class="">
            Vos dépenses de sociétés avec la TVA : expertise comptable, achats, fournisseurs etc ...
          </div>
        </div>
      </div>

    </div>

    <div class="row">
      <!-- CFE -->
      <div class="large-3 small-12 columns">
        <label for="cfe"> CFE à verser </label>
        <input v-model="formValues.cfe" type="number" id="cfe" placeholder="CFE">
        <div class="simulator-form__field__description">
          Vous devez verser une cotisation foncière des entreprises, dont le montant dépend de votre commune.
        </div>
      </div>

      <!-- Rémunération -->
      <div class="large-3 small-12 columns">
        <label for="remuneration"> Rémunération </label>
        <input v-model="formValues.remuneration" id="remuneration" type="number" placeholder="Rémunération">
        <div class="simulator-form__field__description">
          Votre rémunération en tant que gérant. Les cotisations sociales sont calculées sur cette base.
        </div>
      </div>

      <div class="large-3 small-12 columns">
        <label> Prévoyance </label>
        <select id="prevoyance" v-model="formValues.prevoyance" type="number">
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
        </select>
        <div class="simulator-form__field__description">
          Assurance vie.
        </div>
      </div>

      <div class="large-3 small-12 columns">
        <br />
        <input
          :class="{ secondary: submitted && !formValuesChanged }"
          @click.prevent="submit()"
          class="button"
          type="submit"
          :value="'Calculer' + submitButtonSuffix"/>
      </div>

    </div>
  </form>
</template>
