import chargesCalculator from "../../services/chargesCalculator"

export default {
  computed: {
    params() {
      return this.$store.state.calculatorParams
    },
    Results() {
      const results = chargesCalculator(this.params).getResults();
      this.$store.commit('calculatorResults', results);
      return results;
    }
  }
}

