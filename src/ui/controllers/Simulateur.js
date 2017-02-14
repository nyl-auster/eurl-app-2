import chargesCalculator from "../../services/chargesCalculator"

export default {
  methods: {
    formSubmitted(formValues) {
      this.$store.commit('calculatorParams', formValues);
    }
  },
  computed: {
    formValues() {
      return Object.assign({}, this.$store.state.calculatorParams);
    },
    Results() {
      const results = chargesCalculator(this.$store.state.calculatorParams).getResults();
      this.$store.commit('calculatorResults', results);
      return results;
    }
  }
}

