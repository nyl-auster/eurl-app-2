import chargesConfig from "../../services/config";

export default {
  name:'SimulateurResultsTable',
  props:['Results', 'params'],
  data:function() {
    return {
      showDetails:false,
      plafondMax:chargesConfig.plafondMax
    }
  }
}
