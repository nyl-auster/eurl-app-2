export default {
  props:['formValues'],
  data: function() {
    return {
      showHelp: 1,
      form: this.formValues
    }
  },
  methods: {

  },
  watch: {
    "form": {
      deep: true,
      // on émet un évènement à chaque fois que les données du formulaire
      // sont mises à jour pour les autres composants
      handler:function(val, oldVal) {
        this.$emit('onFormValuesUpdated', this.form);
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