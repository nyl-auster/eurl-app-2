import chargesTranchesCalculator from "src/services/chargesTranchesCalculator"

describe('chargesTranchesCalculator', function() {

  it("calculerMontantTranche doit retourner le montant pour d'une tranche avec taux", function() {

    let baseCalcul = 1000;
    let trancheA = {
      taux: 10,
      plafond:100000
    };

    expect(chargesTranchesCalculator.calculerMontantTranche(trancheA, baseCalcul)).toEqual(100);
  });

  it("calculerMontantTranche doit retourner le montant d'une tranche avec montant_forfaitaire", function() {

    let baseCalcul = 1000;
    let trancheA = {
      taux: 10,
      plafond:100000,
      montant_forfaitaire:2
    };

    expect(chargesTranchesCalculator.calculerMontantTranche(trancheA, baseCalcul)).toEqual(2);
  });

  it("calculerTrancheExclusive doit retourner le montant forfaitaire pour une charge avec tranche_exclusive", function() {

    let baseCalcul = 30000;
    const tranches = [
      {
        nom : 'A',
        plafond : 26580,
        montant_forfaitaire : 1214,
        points_retraite : 36
      },
      {
        nom : 'B',
        plafond : 49280,
        montant_forfaitaire : 2427,
        points_retraite : 72
      },
      {
        nom : 'C',
        plafond : 57850,
        montant_forfaitaire : 3641,
        points_retraite : 108
      },
      {
        nom : 'D',
        plafond : 66400,
        montant_forfaitaire : 6068,
        points_retraite : 180
      },
      {
        nom : 'E',
        plafond : 83060,
        montant_forfaitaire : 8495,
        points_retraite :  252
      },
      {
        nom : 'F',
        plafond : 103180,
        montant_forfaitaire : 13349,
        points_retraite : 396
      },
      {
        nom : 'G',
        plafond : 123300,
        montant_forfaitaire : 14563,
        points_retraite : 432
      },
      {
        nom : 'H',
        plafond : Number.MAX_VALUE,
        montant_forfaitaire : 15776,
        points_retraite : 468
      }
    ];

    let result = chargesTranchesCalculator.calculerTrancheExclusive(baseCalcul, tranches);
    expect(result.montant).toEqual(2427);

    baseCalcul = 103180;
    result = chargesTranchesCalculator.calculerTrancheExclusive(baseCalcul, tranches);
    expect(result.montant).toEqual(13349);
  });


  it("calculerTrancheExclusive doit retourner le montant avec taux pour une charge avec tranche_exclusive", function() {

    let baseCalcul = 1000;
    const tranches = [
      {
        taux: 6.50,
        plafond: Number.MAX_VALUE
      }
    ];

    let result = chargesTranchesCalculator.calculerTrancheExclusive(baseCalcul, tranches);
    expect(result.montant).toEqual(65);
  });

  it("calculerTranchesCumulatives doivent cumuler le montant de chaque tranche en fonction du taux", function() {
    let baseCalcul = 50000;
    let tranches = [
      {
        plafond: 38120,
        taux: 15
      },
      {
        plafond: Number.MAX_VALUE,
        taux: 33
      }
    ];
    let result = chargesTranchesCalculator.calculerTranchesCumulatives(baseCalcul, tranches);
    // 38120 * 0.15 = 5718
    // 50 000 - 38120 = 11880
    // 11880 * 0.33 = 3920.4
    // 5718 + 3920.4 = 9638.4
    expect(result.montant).toEqual(9638.4);
  });

});
