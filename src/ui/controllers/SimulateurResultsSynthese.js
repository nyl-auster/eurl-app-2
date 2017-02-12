export default {
  computed: {
    Results() {
      return this.$store.state.calculatorResults
    },
    resultClasses() {
      return {
        success:this.Results.getLine('resteEnBanque').montant > 0,
        alert:this.Results.getLine('resteEnBanque').montant < 0,
      }
    }
  }
}
