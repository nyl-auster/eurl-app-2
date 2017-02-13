import chargesCalculator from "../../services/chargesCalculator"

export default {
  computed: {
    Results() {
      const results = chargesCalculator(this.$store.state.calculatorParams).getResults();
      this.$store.commit('calculatorResults', results);
      return results;
    }
  }
}

