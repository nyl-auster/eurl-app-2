/**
 * Méthodes communes pour nos objets
 * @param datas
 */
const simulatorObject = function(datas) {
  this.extends = function(datas) {
    for (let property in datas) {
      if (datas.hasOwnProperty(property)) {
        this[property] = datas[property];
      }
    }
    return this;
  };
  this.extends(datas);
};

/**
 * Définit une charge dans notre fichier de config.
 * @param datas
 * @constructor
 */
const Contribution = function(datas) {
  this.id = "";
  this.label = "";
  this.plafond = "";
  this.montant = 0;
  this.tranches = [];
  simulatorObject.call(this, datas);
  return this;
};

/**
 * Définit un objet tranche puor un objet Contribution
 * @param datas
 * @constructor
 */
const ContributionBracket = function(datas) {
  this.id = "";
  this.label = "";
  this.taux = "";
  this.montant = 0;
  this.plafond = 0;
  simulatorObject.call(this, datas);
  return this;
};

/**
 * Objet ResultLine, pour afficher une ligne de résultat
 * dans nos vues ensuite.
 * @constructor
 */
const ResultLine = function(datas) {
  this.label = "";
  this.organisme= "";
  this.baseCalcul = 0;
  this.montant = 0;
  this.tranches = [];
  this.tranchesActives = [];
  this.commentaire = "";
  simulatorObject.call(this, datas);
  return this;
};

/**
 * @param resultLines array d'objects ResultLine
 */
const getTotalLine = function(resultLines) {
  let total = 0;
  resultLines.forEach(function(resultLine){
    if (resultLine.montant) {
      total += resultLine.montant;
    }
  });
  console.log(resultLines);
  return new ResultLine().extends({
    class:"total",
    label: 'Total',
    montant: total.toFixedNumber(2)
  });

};

export default {
  ResultLine,
  getTotalLine,
  Contribution,
  ContributionBracket
};
