import _ from 'lodash'

export default {
  data () {
    return {
      showHelp: 1,
      form: Object.assign({}, this.$store.state.calculatorParams)
    }
  },
  methods: {
    submit() {
      this.$store.commit('calculatorParams', this.form);
    }
  },
  watch: {
    "form.bindToCaHt": function(val, oldVal) {
      if (oldVal == 0) {
        this.form.chiffreAffaireTtc = _.round(this.form.chiffreAffaireHt * 1.20, 2);
      }
    },
    "form.bindToFraisHt": function(val, oldVal) {
      if (oldVal == 0) {
        this.form.fraisTtc = _.round(this.form.fraisHt * 1.20, 2);
      }
    },
    "form.chiffreAffaireHt": function(val, oldVal) {
      if (this.form.bindToCaHt) {
        this.form.chiffreAffaireTtc = _.round(this.form.chiffreAffaireHt * 1.20, 2);
      }
    },
    "form.fraisHt": function(val, oldVal) {
      if (this.form.bindToFraisHt) {
        this.form.fraisTtc = _.round(this.form.fraisHt * 1.20, 2);
      }
    }
  }
}
