import _ from 'lodash'

export default {
  props: ['formValues'],
  data () {
    return {
      showHelp: 1,
      oldFormValues: {},
      submitted:false,
      // la liste des champs modifiées depuis la dernière soumission
      formValuesChanged:false,
      submitButtonSuffix:""
    }
  },
  methods: {
    submit() {
      const formValues = Object.assign({}, this.formValues)
      // keep a backup of submitted values
      this.oldFormValues = formValues
      this.$emit('formSubmitted', Object.assign({}, formValues))
      this.submitted = true
      this.formValuesDiff()
    },
    /**
     * Check if form values has changed since last diff.
     * @return {boolean}
     */
    formValuesDiff() {
      let changed = false;
      if (!this.submitted) return false;
      const keys = ['cfe', 'chiffreAffaireHt', 'chiffreAffaireTtc', 'fraisHt', 'fraisTtc', 'prevoyance', 'remuneration'];
      for(const key of keys) {
        if (this.oldFormValues[key] !== this.formValues[key]) {
          changed = true;
          break;
        }
      }
      this.formValuesChanged = changed
      this.submitButtonSuffix = this.formValuesChanged ? ' *' : ''
    }
  },
  watch: {
    "formValues": {
      deep: true,
      handler: function(val, oldVal) {
        this.formValuesDiff()
      }
    },
    "formValues.bindToCaHt": function(val, oldVal) {
      if (oldVal == 0) {
        this.formValues.chiffreAffaireTtc = _.round(this.formValues.chiffreAffaireHt * 1.20, 2)
      }
    },
    "formValues.bindToFraisHt": function(val, oldVal) {
      if (oldVal == 0) {
        this.formValues.fraisTtc = _.round(this.formValues.fraisHt * 1.20, 2)
      }
    },
    "formValues.chiffreAffaireHt": function(val, oldVal) {
      if (this.formValues.bindToCaHt) {
        this.formValues.chiffreAffaireTtc = _.round(this.formValues.chiffreAffaireHt * 1.20, 2)
      }
    },
    "formValues.chiffreAffaireTtc": function(val, oldVal) {
      if (this.formValues.bindToCaHt) {
        this.formValues.chiffreAffaireHt = _.round(this.formValues.chiffreAffaireTtc / 1.2, 2)
      }
    },
    "formValues.fraisHt": function(val, oldVal) {
      if (this.formValues.bindToFraisHt) {
        this.formValues.fraisTtc = _.round(this.formValues.fraisHt * 1.20, 2)
      }
    },
    "formValues.fraisTtc": function(val, oldVal) {
      console.log(this.formValues.fraisTtc);
      if (this.formValues.bindToFraisHt) {
        this.formValues.fraisHt = _.round(this.formValues.fraisTtc / 1.20, 2)
      }
    }
  }
}
