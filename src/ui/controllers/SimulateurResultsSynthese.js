export default {
  props:['Results', 'params'],
  computed: {
    resultClasses: function() {
      return {
        success:this.Results.getLine('resteEnBanque').montant > 0,
        alert:this.Results.getLine('resteEnBanque').montant < 0,
      }
    }
  }
}
