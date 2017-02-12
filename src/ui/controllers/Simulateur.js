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
    setParams (params) {
      this.$store.commit('calculatorParams', params);
    }
  }
}

