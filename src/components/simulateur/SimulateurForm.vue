<script>
  export default {
    props:['params'],
    data: function() {
      return {
        form: {
          chiffreAffaireHt:0,
          chiffreAffaireTtc:0,
          bindToCaHt:true,
          bindToFraisHt:true,
          fraisHt:0,
          fraisTttc:0,
          cfe:500,
          remuneration:0,
          prevoyance:'B'
        }
      }
    },
    methods: {

    },
    watch: {
      "form": {
        deep: true,
        handler:function(val, oldVal) {
          this.$emit('formValuesUpdated', this.form);
        }
      },
      "form.bindToCaHt": function(val, oldVal) {
        if (oldVal == 0) {
          this.form.chiffreAffaireTtc = this.form.chiffreAffaireHt * 1.20;
        }
      },
      "form.bindToFraisHt": function(val, oldVal) {
        if (oldVal == 0) {
          this.form.fraisTtc = this.form.fraisHt * 1.20;
        }
      },
      "form.chiffreAffaireHt": function(val, oldVal) {
        if (this.form.bindToCaHt) {
          this.form.chiffreAffaireTtc = this.form.chiffreAffaireHt * 1.20;
        }
      },
      "form.fraisHt": function(val, oldVal) {
        if (this.form.bindToFraisHt) {
          this.form.fraisTtc = this.form.fraisHt * 1.20;
        }
      }
    }
  }

</script>

<template>

  <form>
    <div class="row">

      <!-- Chiffres d'affaires HT -->
      <div class="large-3 small-12 columns">
        <label for="chiffre_affaire_ht">Chiffre d'affaires HT</label>
        <input id="chiffre_affaire_ht" v-model.number="form.chiffreAffaireHt" type="number">
        <div class="charges-form__field__descripton">
          Votre chiffre d'affaires sans la TVA de vos ventes. C'est une base de calcul pour certaines des charges.
        </div>
      </div>

      <!-- Chiffre d'affaire TTC -->
      <div class="large-3 small-12 columns">
        <label for="chiffre_affaire_ttc">Chiffre d'affaires TTC</label>
        <input v-model.number="form.chiffreAffaireTtc" type="number" id="chiffre_affaire_ttc"
               :disabled="form.bindToCaHt">

        <div class="charges-form__field__descripton">

          <input type="checkbox" v-model.number="form.bindToCaHt"> <em>automatiquement à 20% du HT</em> <br>
          Le total des ventes de la société en incluant la TVA.
        </div>
      </div>

      <!-- frais HT -->
      <div class="large-3 small-12 columns">
        <label for="fraisHt"> Frais HT </label>
        <input v-model="form.fraisHt" type="number" id="fraisHt">
        <div class="charges-form__field__descripton">
          Vos dépenses de sociétés <strong>hors taxe</strong> : expertise comtpable, achats, fournisseurs etc ...
        </div>
      </div>

      <!-- frais TTC-->
      <div class="large-3 small-12 columns">
        <label for="fraisTtc"> Frais TTC </label>
        <input v-model="form.fraisTtc" type="number" id="fraisTtc"
               class="form-control ng-pristine ng-untouched ng-valid ng-not-empty" placeholder="Frais TTC"
               ng-disabled="form.bindToFraisHt" disabled="disabled">
        <div class="charges-form__field__descripton">

          <input type="checkbox" v-model="form.bindToFraisHt" class="ng-pristine ng-untouched ng-valid ng-not-empty">
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
        <input v-model="form.cfe" type="number" class="form-control ng-pristine ng-untouched ng-valid ng-not-empty"
               id="cfe" placeholder="CFE">
        <div class="charges-form__field__descripton">
          Vous devez verser une cotisation foncière des entreprises, dont le montant dépend de votre commune.
        </div>
      </div>

      <!-- Rémunération -->
      <div class="large-3 small-12 columns">
        <label for="remuneration"> Rémunération </label>
        <input v-model="form.remuneration" id="remuneration" type="number"
               class="form-control ng-pristine ng-untouched ng-valid ng-not-empty" placeholder="Rémunération">
        <div class="charges-form__field__descripton">
          Votre rémunération en tant que gérant. Les cotisations sociales sont calculées sur cette base.
        </div>
      </div>

      <div class="large-3 small-12 columns end">
        <label> Prévoyance </label>
        <select v-model="form.prevoyance" type="number">
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
        </select>
        <div class="charges-form__field__descripton">
          Assurance vie.
        </div>
      </div>

    </div>
  </form>
</template>

<style>

</style>

