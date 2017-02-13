export default {
  props:['Results'],
  computed: {
    resultClasses() {
      return {
        success:this.Results.getLine('resteEnBanque').montant > 0,
        alert:this.Results.getLine('resteEnBanque').montant < 0,
      }
    }
  }
}
