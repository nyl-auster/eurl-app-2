import Vue from "vue";
import SimulateurResultsSynthese from 'src/components/simulateur/SimulateurResultsSynthese'
import chargesCalculator from "src/services/chargesCalculator";

describe('SimulateurResultsSynthese.vue', function() {

  it('doit afficher le total à provisionner et le solde restant', function() {

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

    const Component = Vue.extend(SimulateurResultsSynthese);
    const vm = new Component({propsData}).$mount();
    expect(vm.$el.querySelector(".test--a-provisionner-result").textContent).toEqual(Results.getLine('totalContributions').montant + " €");
    expect(vm.$el.querySelector(".test--solde-result").textContent).toEqual(Results.getLine('resteEnBanque').montant + " €");

  });

  it('doit ajouter une classe css success quand le solde est positif', function() {

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

    const Component = Vue.extend(SimulateurResultsSynthese);
    const vm = new Component({propsData}).$mount();
    // success devrait être faux si on ne fait pas de bénéfice
    expect(vm.resultClasses.success).toEqual(true);
    expect(vm.resultClasses.alert).toEqual(false);

  });

  it('doit ajouter une classe css alert quand un solde devient négatif', function() {

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

    const Component = Vue.extend(SimulateurResultsSynthese);
    const vm = new Component({propsData}).$mount();
    // success devrait être faux si on ne fait pas de bénéfice
    expect(vm.resultClasses.success).toEqual(false);
    expect(vm.resultClasses.alert).toEqual(true);

  });

});
