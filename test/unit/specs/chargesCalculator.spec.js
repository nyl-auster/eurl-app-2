import chargesCalculator from "src/services/chargesCalculator"

// Be descriptive with titles here. The describe and it titles combined read like a sentence.
describe('Service chargesCalculator', function() {

  /* ==============================
   ALLOCATIONS FAMILIALES
   ==============================  */

  it("calculer le taux de la première tranche à 2.15 des allocations familiales", function() {
    const params = {
      chiffreAffaireHt:0,
      chiffreAffaireTtc:0,
      fraisTtc:0,
      fraisHt:0,
      remuneration:10000,
      cfe:0,
      prevoyance:0
    };
    const calculator = chargesCalculator(params);
    expect(calculator.allocationsFamiliales().montant).toEqual(215);
  });


  it("calculer la tranche à taux progressif des allocations familiales", function() {
    let params = {
      chiffreAffaireHt:0,
      chiffreAffaireTtc:0,
      remuneration:50000,
      cfe:0,
      prevoyance:0
    };
    // si PASS = 39228 €
    // let tauxProgressif = ((tauxPlein - tauxReduit) / (0.3 * PASS)) * (baseCalcul - 1.1 * PASS) + tauxReduit
    // tauxProgressif = ((5.25 - 2.15) / (0.3 * 39228)) * (50 000 - 1.1 * 39228) + 2.15
    // tauxProgressif = (3.1 / 11768,4) * (50 000 -  43 150.8) + 2.15
    // tauxProgressif = 0,00026342 * 6849,2 + 2.15
    // tauxProgressif = 1.80 + 2.15
    // tauxProgressif = 3.95
    // 50 000  * 0.0395 = 1975 €
    let calculator = chargesCalculator(params);
    expect(calculator.allocationsFamiliales().tranches[1].taux).toEqual(3.95);
    expect(calculator.allocationsFamiliales().montant).toEqual(1975);

    params = {
      chiffreAffaireHt:0,
      chiffreAffaireTtc:0,
      remuneration:45000,
      cfe:0,
      prevoyance:0
    };
    // si PASS = 39228 €
    // let tauxProgressif = ((tauxPlein - tauxReduit) / (0.3 * PASS)) * (baseCalcul - 1.1 * PASS) + tauxReduit
    // tauxProgressif = ((5.25 - 2.15) / (0.3 * 39228)) * (45 000 - 1.1 * 39228) + 2.15
    // tauxProgressif = (3.1 / 11768,4) * ( 45 000 -  43 150.8) + 2.15
    // tauxProgressif = 0,00026342 * 1849,2 + 2.15
    // tauxProgressif = 1.80 + 2.15
    // tauxProgressif = 2.64
    // 45 000  * 0.0264 = 1188 €
    calculator = chargesCalculator(params);
    expect(calculator.allocationsFamiliales().tranches[1].taux).toEqual(2.64);
    expect(calculator.allocationsFamiliales().montant).toEqual(1188);
  });

  it("calculer le taux de la dernière tranches à 5.25 des allocations familiales", function() {
    const params = {
      chiffreAffaireHt:0,
      chiffreAffaireTtc:0,
      remuneration:100000,
      cfe:0,
      prevoyance:0
    };
    let calculator = chargesCalculator(params);
    expect(calculator.allocationsFamiliales().montant).toEqual(5250);
  });


});
