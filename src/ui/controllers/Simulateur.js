import chargesCalculator from "../../services/chargesCalculator"

export default {
  computed: {
    params() {
      return this.$store.state.calculatorParams
    },
    Results() {
      return chargesCalculator(this.params).getResults();
    }
  },
  methods: {
    // mettre à jour les données de notre simulateur
    setParams: function (formValues) {
      for (const property in formValues) {
        this.params[property] = formValues[property];
      }
      this.$store.commit('calculatorParams', this.params);
      this.calculateResults();
    },
    calculateResults: function () {
      this.Results = chargesCalculator(this.$store.state.calculatorParams).getResults();
    }
  }
}

