import chargesConfig from "../../services/config";

export default {
  props:['Results', 'CalculatorParams'],
  data() {
    return {
      showDetails:false,
      plafondMax:chargesConfig.plafondMax
    }
  }
}
