/**
 * Responsability : transformer les paramètres de chargesConfig
 * En des lignes de montants calculés
 *
 * Augment les objets chargesConfig avec deux clefs :
 * - le montant global à payer en fonction de la base de calcul
 * - les "tranches actives" : le détail du montant par tranche
 */

// ajout d'une nouvelle méthode au prototype pour arrondir à
// 2 chiffres après la virgule
Number.prototype.toFixedNumber = function(x, base){
  var pow = Math.pow(base||10,x);
  return +( Math.round(this*pow) / pow );
};

const service = {};

/**
 * Retourne le montant pour une tranche de charge.
 * @param tranche object
 *   - montant : peut être déjà rempli pour les montants forfaitaires
 *   - taux : le pourcentage à appliquer sur le montant
 *   - montant_forfaitaire : si la tranche est un montant fixe en fonction du plafond.
 * @param baseCalcul float
 */
service.calculerMontantTranche = (tranche, baseCalcul) => {
  let montant = 0;
  if (tranche.montant_forfaitaire) {
    montant = tranche.montant_forfaitaire;
  }
  else if (tranche.taux) {
    montant = baseCalcul * (tranche.taux / 100);
  }
  // tranche.montant = montant.toFixedNumber(2);
  // tranche.baseCalcul = baseCalcul;
  return montant.toFixedNumber(2);
};

/**
 * Calcul la tranche qui correspond à baseCalcul en fonction du tableau "tranches".
 * Pour les tranches exclusives, seule UNE tranche est conservé pour le calcul, les
 * tranches précédentes ou suivantes n'entrent donc en rien dans le calcul du montant
 * de la cotisation
 *
 * @param baseCalcul float | int :
 * @param charge array : tableau d'objet "charge"
 *
 * @return objet
 */
service.calculerTrancheExclusive = (baseCalcul, tranches) => {

  let result = {};

  result.montant = 0;

  // on recherche la tranche qui correspond à notre baseCalcul
  let trancheActive = null;

  tranches.forEach(function(tranche) {
    // tant que la base de calcul n'est pas supérieur au plafond en cours, on continue
    // d'itérer.
    if (!trancheActive && baseCalcul <= tranche.plafond) {
      // on a dépassé le plafond, on arrête de mettre à jour la variable trancheActive
      // qui contient maintenant notre réponse
      //tranche.baseCalcul = baseCalcul;
      trancheActive = tranche;
    }
  });

  if (trancheActive) {
    result.montant = service.calculerMontantTranche(trancheActive, baseCalcul);
    result.baseCalcul = baseCalcul;
    result.trancheActives = [trancheActive];
  }

  return result;
};

/**
 * Calcul des charges à tranches cumulatives, tels que l'impot sur les bénéfices :
 * 15% pour pour les 38120 premiers euros, puis on ajoute 33,33% sur le reste des bénéfices
 *
 * @param baseCalcul float
 * @param charge array : tableau d'objet "charges"
 */
service.calculerTranchesCumulatives = (baseCalcul, charge) => {

  charge.montant = 0;

  // contiendra la liste des tranches qui seront appliquée
  // à notre base de calcul
  var tranches = [];

  // montant total, toute tranches cumulées
  var montant = 0;
  var plancher = 0;

  charge.tranches.forEach((tranche, index) => {

    // on calcule le "plancher" de la tranche, qui est soit égal
    // au plafond précédent, soit à zéro si c'est la première tranche.
    if (typeof tranches[index - 1] !== 'undefined') {
      plancher = tranches[index - 1].plafond;
    }
    // on calcule la différence entre le plafond et le plancher
    tranche.intervalle = tranche.plafond - plancher;

    // si la somme est supérieure ou égale au plafond de la tranche courante ...
    if (baseCalcul >= tranche.plafond)
    {
      // ... on calcule le montant dû pour la tranche courante
      tranche.baseCalcul = tranche.intervalle;
      tranche.montant = service.calculerMontantTranche(tranche, tranche.baseCalcul).toFixedNumber(2);
      // on ajoute le montant de la cotisation de cette tranche au total.
      montant += tranche.montant;
      // ajout à la liste des tranches qui s'applique à notre cas.
      tranches.push(tranche);
    }

    // mais si la somme est inférieure au plafond courant, c'est que nous sommes à la dernière tranche
    else
    {
      // on calcule le montant pour cette derniere tranche
      var depassement_plancher = baseCalcul - plancher;
      if (depassement_plancher > 0)
      {
        tranche.baseCalcul = depassement_plancher;
        montant += tranche.montant = service.calculerMontantTranche(tranche, tranche.baseCalcul).toFixedNumber(2);
        // ajout à la liste des tranches qui s'appliquent à notre cas.
        tranches.push(tranche);
      }
    }

  });

  charge.montant = montant;
  charge.tranchesActives= tranches;

  return charge;
};

export default service;




