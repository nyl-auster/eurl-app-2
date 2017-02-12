import chargesCalculator from "../../services/chargesCalculator"

export default {
  data: function () {
    return {
      // paramètres de base pour initier le calcul de nos dettes
      params: {
        chiffreAffaireHt: 0,
        chiffreAffaireTtc: 0,
        bindToCaHt: true,
        bindToFraisHt: true,
        fraisHt: 0,
        fraisTtc: 0,
        cfe: 1000,
        remuneration: 0,
        prevoyance: 'B'
      }
    }
  },
// calculer les résultats lors de la création de la vue
  created: function () {
    //this.calculateResults();
  },
  computed: {
    Results: function () {
      return chargesCalculator(this.params).getResults();
    }
  },
  methods: {
    // mettre à jour les données de notre simulateur
    setParams: function (formValues) {
      for (const property in formValues) {
        this.params[property] = formValues[property];
      }
      this.calculateResults();
    },
    calculateResults: function () {
      this.Results = chargesCalculator(this.params).getResults();
    }
  }
}
