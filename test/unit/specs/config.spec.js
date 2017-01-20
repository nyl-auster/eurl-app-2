import config from "src/services/config";

// Be descriptive with titles here. The describe and it titles combined read like a sentence.
describe('Dans le fichier de configuration des charges', function() {

  it("les objets charges doivent avoir les clefs obligatoires id, label et organisme", function() {
    for(charge in config.charges) {
      expect(config.charges[charge].id).toBeDefined(`propriété "id" manquante pour la charge ${charge}`);
      expect(config.charges[charge].label).toBeDefined(`propriété "label" manquante pour la charge ${charge}`);
      expect(config.charges[charge].organisme).toBeDefined(`propriété "organisme" manquante pour la charge ${charge}`);
      if (charge != 'prevoyance') {
        expect(config.charges[charge].tranches).toBeDefined(
          `propriété "tranches" manquante pour la charge ${charge}`);
      }
    }
  });

  it("Les plafonds de la sécurité sociale doivent être égal à 39228", function() {
    expect(config.plafond_securite_sociale).toEqual(39228);
  });

  it("Le plafond maximum de la dernière tranche doit être définie à Number.MAX_VALUE", function() {
    expect(config.plafondMax).toEqual(Number.MAX_VALUE);
  });

  it("La fonction getContribution() permettant de retrouver une contribution par son Id toit être définie", function() {
    expect(config.getContribution).toBeDefined();
  });

});
