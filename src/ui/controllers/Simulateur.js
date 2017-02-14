import chargesCalculator from "../../services/chargesCalculator"

export default {
  data: function() {
    return {
      formValues: Object.assign({}, this.$store.state.calculatorParams)
    }
  },
  methods: {
    formSubmitted(formValues) {
      this.$store.commit('calculatorParams', formValues);
    }
  },
  computed: {
    Results() {
      const results = chargesCalculator(this.$store.state.calculatorParams).getResults();
      this.$store.commit('calculatorResults', results);
      return results;
    }
  }
}

