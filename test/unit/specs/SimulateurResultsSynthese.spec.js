import Vue from "vue";
import SimulateurResultsSynthese from 'src/components/simulateur/SimulateurResultsSynthese'
import chargesCalculator from "src/services/chargesCalculator";

describe('SimulateurResultsSynthese.vue', function() {

  it('devrait afficher le bon montant pour les provisions et le solde', function() {

    // paramètres de base pour initier le calcul de nos dettes
    const params = {
      chiffreAffaireHt: 0,
      chiffreAffaireTtc: 0,
      bindToCaHt: true,
      bindToFraisHt: true,
      fraisHt: 0,
      fraisTtc: 0,
      cfe: 500,
      remuneration: 0,
      prevoyance: 'B'
    };
    const Results = chargesCalculator(params).getResults();
    let propsData = {
      Results
    };

    const Ctor = Vue.extend(SimulateurResultsSynthese);
    const vm = new Ctor({propsData}).$mount();
    expect(vm.$el.querySelector(".test--a-provisionner-result").textContent).toEqual(Results.getLine('totalContributions').montant + " €");
    expect(vm.$el.querySelector(".test--solde-result").textContent).toEqual(Results.getLine('resteEnBanque').montant + " €");

  });

  it('devrait afficher un solde positif avec une classe css success', function() {

    // paramètres de base pour initier le calcul de nos dettes
    let params = {
      chiffreAffaireHt: 100000,
      chiffreAffaireTtc: 120000,
      bindToCaHt: true,
      bindToFraisHt: true,
      fraisHt: 0,
      fraisTtc: 0,
      cfe: 500,
      remuneration: 1000,
      prevoyance: 'B'
    };
    let Results = chargesCalculator(params).getResults();
    let propsData = {
      Results
    };

    const Ctor = Vue.extend(SimulateurResultsSynthese);
    const vm = new Ctor({propsData}).$mount();
    // success devrait être faux si on ne fait pas de bénéfice
    expect(vm.resultClasses.success).toEqual(true);
    expect(vm.resultClasses.alert).toEqual(false);

  });

  it('devrait afficher un solde négatif avec une classe css alert', function() {

    // paramètres de base pour initier le calcul de nos dettes
    let params = {
      chiffreAffaireHt: 0,
      chiffreAffaireTtc: 0,
      bindToCaHt: true,
      bindToFraisHt: true,
      fraisHt: 0,
      fraisTtc: 0,
      cfe: 500,
      remuneration: 99999,
      prevoyance: 'B'
    };
    let Results = chargesCalculator(params).getResults();
    let propsData = {
      Results
    };

    const Ctor = Vue.extend(SimulateurResultsSynthese);
    const vm = new Ctor({propsData}).$mount();
    // success devrait être faux si on ne fait pas de bénéfice
    expect(vm.resultClasses.success).toEqual(false);
    expect(vm.resultClasses.alert).toEqual(true);

  });

});
