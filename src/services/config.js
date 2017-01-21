/**
 * Paramètres pour calculer les charges d'une EURL à l'IS
 * qui seront consommés par le service "chargesCalculator",
 * qui permettra de calculer le montant des cotisations et impots à payer.
 *
 * SOURCES pour le calcul des cotisations:
 *
 *   CIPAV
 *   http://www.cnavpl.fr/les-chiffres-cles/principaux-config-du-regime-de-base/principaux-config-variables-du-regime-de-base/
 *
 *   URSSAF
 *   https://www.urssaf.fr/portail/home/taux-et-baremes/taux-de-cotisations/les-professions-liberales/bases-de-calcul-et-taux-des-coti.html
 *   https://www.urssaf.fr/portail/home/independant/mes-cotisations/quelles-cotisations/les-contributions-csg-crds/taux-de-la-csg-crds.html
 *
 *   RSI
 *   https://www.rsi.fr/cotisations/professions-liberales/presentation-des-cotisations.html
 *   http://www.leblogdudirigeant.com/tns-base-de-calcul-cotisations-25022015albddlau/
 *
 * Le RSI gère votre protection santé maladie-maternité.
 *
 * La retraite et l'invalidité décès sont assurées par la CNAVPL ou la CNBF
 *
 * Les autres cotisations sociales sont à verser à l'URSSAF :
 * allocations familiales, les contributions sociales (CSG/CRDS),
 * formation professionnelle
 */

import ObjectInterfaces from "./ObjectInterfaces";

const config = {};
config.plafondMax =  Number.MAX_VALUE;
// paramètres généraux pour le calcul des montants et charges
config.plafond_securite_sociale = 39228;

const contributions = [];

contributions.push(new ObjectInterfaces.Contribution({
  id:'maladieMaternite',
  label: 'Maladie-maternité',
  // @TODO : mettre dans les tranches et calculer
  organisme:'RSI',
  premiere_annee: {
    baseCalcul:config.plafond_securite_sociale * 0.19
  },
  deuxieme_annee: {
    baseCalcul:config.plafond_securite_sociale * 0.27
  },
  taux_reduit: {
    plafond: 27460,
    taux_reduit:"3",
    taux_plein:"6.5",
  },
  tranches:[
    new ObjectInterfaces.ContributionBracket({
      label:"Tranche 1",
      taux:6.50,
      plafond: config.plafondMax
    })
  ]
}));

contributions.push(new ObjectInterfaces.Contribution({
  id:'allocationsFamiliales',
  label:'Allocations familiales',
  organisme:'URSSAF',
  commentaire:"Pour les revenus compris entre 42 478 € et 54 062 €, taux progressif : entre 2,15 % et 5,25 %. Faute de détails, le calculateur passe à 5.25 dès qu'on dépasse 42 478 €",
  tranches:[
    new ObjectInterfaces.ContributionBracket({
      label: "Tranche 1",
      plafond:42478,
      commentaire:"Le plafond de cette tranche est égal à 110% du PASS",
      taux:2.15
    }),
    // const tauxProgressif = ((tauxPlein - tauxReduit) / (0.3 * PASS)) * (baseCalcul - 1.1 * PASS) + tauxReduit
    new ObjectInterfaces.ContributionBracket({
      label:'Tranche 2',
      commentaire:"Taux progressif de 2.15% à 5.25% entre 110% du PASS et 140% du PASS",
      taux_reduit:2.15,
      taux_plein:5.25,
      plafond: 54062
    }),
    new ObjectInterfaces.ContributionBracket({
      label:'Tranche 3',
      taux: 5.25,
      plafond: config.plafondMax
    }),
  ]
}));

contributions.push(new ObjectInterfaces.Contribution({
  id:"cgsCrds",
  organisme:'URSSAF',
  label:'CGS-CRDS',
  commentaire:"Base de calcul : 	Totalité du revenu de l’activité non salariée + cotisations sociales obligatoires hors CSG-CRDS",
  tranches:[
    new ObjectInterfaces.ContributionBracket({
      label:"Tranche 1",
      taux: 8,
      plafond: config.plafondMax
    })
  ]
}));

contributions.push(new ObjectInterfaces.Contribution({
  id:'csgNonDeductible',
  organisme:'URSSAF',
  label:'CSG-CRDS Non déductible',
  commentaire:"Base de calcul : 	Totalité du revenu de l’activité non salariée + cotisations sociales obligatoires hors CSG-CRDS",
  tranches:[
    new ObjectInterfaces.ContributionBracket({
      label:"Tranche 1",
      taux: 8,
      plafond: config.plafondMax
    })
  ]
}));

contributions.push(new ObjectInterfaces.Contribution({
  id:"formationProfessionnelle",
  label: 'Formation professionnelle',
  organisme: 'URSSAF',
  commentaire: "Base de calcul forfaitaire (fixe): plafond de la sécurité sociale",
  tranches:[
    new ObjectInterfaces.ContributionBracket({
      label: "Tranche 1",
      taux: 0.25,
      plafond: config.plafondMax
    })
  ]
}));

// CIPAV - Retraite de base CNAVPL
// http://service.cipav-retraite.fr/cipav/article-33-recapitulatif-des-options-de-montantmax04.htm
// Voir le simulateur ici pour des exemples concrets :
// http://www.guide-tns.fr/simulateurs/chargesprofessionnelliberal.html
contributions.push(new ObjectInterfaces.Contribution({
  id: "retraiteBase",
  label: 'Retraite de base',
  organisme: 'CIPAV',
  description: "Retraite de base CNAVPL",
  commentaire: "En cas de revenus non connus : 3 178 € (maximum de la tranche 1) ; 3 611 € (maximum de la tranche 2)",
  // montant forfaitaire en dessous d'un certain plafond
  revenus_non_connus: 3611,
  montant_forfaitaire : {
    label:"Montant forfaitaire retraite de base",
    commentaire:"si les revenus sont inférieurs à 4441€, le montant est forfaitaire",
    plafond:  4441,
    montant: 448
  },
  tranches:[
    new ObjectInterfaces.ContributionBracket({
      label:"Tranche 1",
      commentaire:"8.23% + 1.87% pour la première tranche",
      plafond: config.plafond_securite_sociale,
      taux:  10.1
    }),
    new ObjectInterfaces.ContributionBracket({
      label: "Tranche 2",
      plafond: 193080,
      taux: 1.87
    })
  ]
}));

contributions.push(new ObjectInterfaces.Contribution({
  id:"impotSocietes",
  label: 'Impot sur les sociétés',
  organisme: "Impots",
  tranches:[
    new ObjectInterfaces.ContributionBracket({
      label: "tranche 1",
      plafond: 38120,
      taux: 15
    }),
    new ObjectInterfaces.ContributionBracket({
      label: "tranche 2",
      plafond: config.plafondMax,
      taux: 33
    })
  ]
}));

// CIPAV: Assurance vieillesse "complémentaire" ( mais obligatoire :-p )
// http://service.cipav-retraite.fr/cipav/article-28-principes-de-calcul-des-cotisations-103.htm
// http://service.cipav-retraite.fr/cipav/article-33-recapitulatif-des-options-de-montantmax04.htm
contributions.push(new ObjectInterfaces.Contribution({
  id: 'retraiteComplementaire',
  label : 'Retraite complémentaire',
  organisme: 'CIPAV',
  tranches:[
    new ObjectInterfaces.ContributionBracket({
      label : 'A',
      plafond : 26580,
      montant_forfaitaire : 1214,
      points_retraite : 36
    }),
    new ObjectInterfaces.ContributionBracket({
      label : 'B',
      plafond : 49280,
      montant_forfaitaire : 2427,
      points_retraite : 72
    }),
    new ObjectInterfaces.ContributionBracket({
      label : 'C',
      plafond : 57850,
      montant_forfaitaire : 3641,
      points_retraite : 108
    }),
    new ObjectInterfaces.ContributionBracket({
      label : 'D',
      plafond : 66400,
      montant_forfaitaire : 6068,
      points_retraite : 180
    }),
    new ObjectInterfaces.ContributionBracket({
      label : 'E',
      plafond : 83060,
      montant_forfaitaire : 8495,
      points_retraite :  252
    }),
    new ObjectInterfaces.ContributionBracket({
      label : 'F',
      plafond : 103180,
      montant_forfaitaire : 13349,
      points_retraite : 396
    }),
    new ObjectInterfaces.ContributionBracket({
      label : 'G',
      plafond : 123300,
      montant_forfaitaire : 14563,
      points_retraite : 432
    }),
    new ObjectInterfaces.ContributionBracket({
      label : 'H',
      plafond : config.plafondMax,
      montant_forfaitaire : 15776,
      points_retraite : 468
    })
  ]
}));

// Réduction assurance vieillesse complémentaire
// @pas appliquée dans le calculateur pour le moment
contributions.push(new ObjectInterfaces.Contribution({
  id: "reductionRetraiteComplementaire",
  organisme:'CIPAV',
  label: "Réduction assurance vieillesse complémentaire",
  tranches:[
    new ObjectInterfaces.ContributionBracket({
      label: "Tranche 1",
      plafond : 5792,
      taux : 100,
      points_retraite:0,
      commentaire:"aucun point retraite",
    }),
    new ObjectInterfaces.ContributionBracket({
      label: "Tranche 2",
      plafond : 11585,
      taux : 75,
      points_retraite:9,
      commentaire:"9 points retraite",
    }),
    new ObjectInterfaces.ContributionBracket({
      label: "Tranche 3",
      plafond :  17377,
      taux :50,
      commentaire:"18 points retraite",
      points_retraite:18
    }),
    new ObjectInterfaces.ContributionBracket({
      label: "Tranche 4",
      plafond : 23170,
      taux : 25,
      points_retraite:27,
      commentaire:"27 points retraite"
    })
  ]
}));

contributions.push(new ObjectInterfaces.Contribution({
  id:"prevoyance",
  organisme:'CIPAV',
  label: "Invalidité Décès",
  commentaire:"de 76 à 380 euros selon votre choix de classe A, B ou C",
  classes: [
    {
      classe: 'A',
      label: 'Classe A',
      montant_forfaitaire: 76
    },
    {
      classe: 'B',
      label: 'Classe B',
      montant_forfaitaire: 228
    },
    {
      classe: 'C',
      label: 'Classe C',
      montant_forfaitaire: 380
    }
  ]
}));

config.contributions = contributions;

config.getContribution = function(contributionId) {
  let ContributionSearched = null;
  config.contributions.forEach(function(Contribution) {
    if (Contribution.id == contributionId) {
      ContributionSearched = Contribution;
    }
  });
  return ContributionSearched;
};

// les professions libérales ne cotisent pas pour les indemnités journalières
// source : http://www.rsi.fr/baremes/html
//config.indemnitesJournalieres = {};

export default config;


