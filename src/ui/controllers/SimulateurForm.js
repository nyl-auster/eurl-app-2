import _ from 'lodash'

export default {
  props: ['formValues'],
  data () {
    return {
      showHelp: 1,
      oldFormValues: {},
      submitted:false,
      // la liste des champs modifiées depuis la dernière soumission
      formValuesChanged:[],
      submitButtonSuffix:""
    }
  },
  methods: {
    submit() {
      const formValues = Object.assign({}, this.formValues);
      // conserver une copie des données au moment de la sauvegarde
      this.oldFormValues = formValues;
      // émettre un évènement avec les données soumises par le formulaire
      this.$emit('formSubmitted', Object.assign({}, formValues));
      this.submitted = true;
      this.formValuesDiff();
    },
    formValuesDiff() {
      if (this.submitted) {
        const oldFormValues = this.oldFormValues;
        this.formValuesChanged = _.reduce(this.formValues, function(result, value, key) {
          return _.isEqual(value, oldFormValues[key]) ?
            result : result.concat(key);
        }, []);
        if (this.formValuesChanged.length > 0) {
          this.submitButtonSuffix = ' *';
        }
        else {
          this.submitButtonSuffix = '';
        }
      }
    }
  },
  watch: {
    "formValues": {
      deep: true,
      handler: function(val, oldVal) {
        this.formValuesDiff();
      }
    },
    "formValues.bindToCaHt": function(val, oldVal) {
      if (oldVal == 0) {
        this.formValues.chiffreAffaireTtc = _.round(this.formValues.chiffreAffaireHt * 1.20, 2);
      }
    },
    "formValues.bindToFraisHt": function(val, oldVal) {
      if (oldVal == 0) {
        this.formValues.fraisTtc = _.round(this.formValues.fraisHt * 1.20, 2);
      }
    },
    "formValues.chiffreAffaireHt": function(val, oldVal) {
      if (this.formValues.bindToCaHt) {
        this.formValues.chiffreAffaireTtc = _.round(this.formValues.chiffreAffaireHt * 1.20, 2);
      }
    },
    "formValues.fraisHt": function(val, oldVal) {
      if (this.formValues.bindToFraisHt) {
        this.formValues.fraisTtc = _.round(this.formValues.fraisHt * 1.20, 2);
      }
    }
  }
}
