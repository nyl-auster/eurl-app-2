import Vue from 'vue'
import SimulateurForm from 'src/components/simulateur/SimulateurForm'

let propsData = {
  // paramètres de base pour initier le calcul de nos dettes
  formValues: {
    chiffreAffaireHt: 0,
    chiffreAffaireTtc: 0,
    bindToCaHt: true,
    bindToFraisHt: true,
    fraisHt: 0,
    fraisTtc: 0,
    cfe: 500,
    remuneration: 0,
    prevoyance: 'B'
  }
};

describe('Le composant Vue SimulateurForm.vue', function() {
  it('contient bien 4 champs input et un select avec les bons ids', function() {
    const Component = Vue.extend(SimulateurForm);
    const vm = new Component({propsData:propsData}).$mount();
    expect(vm.$el.querySelector('input#chiffre-affaire-ttc')).not.toBe(null);
    expect(vm.$el.querySelector('input#frais-ht')).not.toBe(null);
    expect(vm.$el.querySelector('input#frais-ttc')).not.toBe(null);
    expect(vm.$el.querySelector('input#cfe')).not.toBe(null);
    expect(vm.$el.querySelector('select#prevoyance')).not.toBe(null);
  });
});
