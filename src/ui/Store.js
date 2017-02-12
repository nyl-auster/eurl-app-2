/**
 * Vuex store
 */
export default {
  state: {
    calculatorParams: {
      chiffreAffaireHt: 0,
      chiffreAffaireTtc: 0,
      bindToCaHt: true,
      bindToFraisHt: true,
      fraisHt: 0,
      fraisTtc: 0,
      cfe: 1000,
      remuneration: 0,
      prevoyance: 'A'
    },
    calculatorResults: {}
  },
  mutations: {
    calculatorParams (state, params) {
      state.calculatorParams = params
    },
    calculatorResults(state, params) {
      state.calculatorResults = params;
    }
  }
};
