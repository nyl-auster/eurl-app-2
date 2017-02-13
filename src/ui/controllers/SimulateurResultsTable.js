import chargesConfig from "../../services/config";

export default {
  props:['Results'],
  data () {
    return {
      showDetails:false,
      plafondMax:chargesConfig.plafondMax
    }
  }
}
