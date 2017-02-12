import chargesConfig from "../../services/config";

export default {
  data:function() {
    return {
      showDetails:false,
      plafondMax:chargesConfig.plafondMax
    }
  },
  computed: {
    Results() {
      return this.$store.state.calculatorResults
    }
  }
}
