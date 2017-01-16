// ajout d'une nouvelle méthode au prototype Number pour arrondir à
// 2 chiffres après la virgule
Number.prototype.toFixedNumber = function(x, base){
  const pow = Math.pow(base||10,x);
  return +( Math.round(this*pow) / pow );
};

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
};

/**
 * Définit une charge dans notre fichier de config.
 * @param datas
 * @constructor
 */
const Contribution = function(datas) {
  simulatorObject.call(this, datas);
  this.id = "";
  this.label = "";
  this.plafond = "";
  this.montant = 0;
  this.tranches = [];
  this.extends(datas);
  return this;
};

/**
 * Définit un objet tranche puor un objet Contribution
 * @param datas
 * @constructor
 */
const ContributionBracket = function(datas) {
  simulatorObject.call(this, datas);
  this.label = "";
  this.taux = "";
  this.baseCalcul = ""
  this.montant = 0;
  this.plafond = 0;
  this.extends(datas);
  return this;
};

/**
 * Objet ResultLine, pour afficher une ligne de résultat
 * dans nos vues ensuite.
 * @constructor
 */
const ResultLine = function(datas) {
  simulatorObject.call(this, datas);
  this.label = "";
  this.type = "result";
  this.organisme= "";
  this.baseCalcul = 0;
  this.montant = 0;
  this.tranches = [];
  this.tranchesActives = [];
  this.commentaire = "";
  this.extends(datas);
  return this;
};

/**
 * @param resultLines array d'objects ResultLine
 * @constructor
 */
const Results = function() {

  this.lines = [];
  this.total = 0;

  this.addLine = function(ResultLine) {
    this.lines.push(ResultLine);
    // on ajout au total tous les types de ligne "result"
    if ('result' === ResultLine.type) {
      this.total += ResultLine.montant.toFixedNumber(2);
    }
  };

  this.getTotal = function() {
    return this.total.toFixedNumber(2);
  };

  this.sum = function(resultLineIds) {
    let sum = 0;
    resultLineIds.forEach((resultLineId) => {
      const ResultLine = this.getLine(resultLineId);
      sum += ResultLine.montant;
    });
    return sum.toFixedNumber(2);
  };

  this.getLine = function(resultLineId) {
    let result = null;
    this.lines.forEach(function(ResultLine) {
      if (resultLineId == ResultLine.id) {
        result = ResultLine;
      }
    });
    return result;
  };

};

export default {
  Results,
  ResultLine,
  Contribution,
  ContributionBracket,
};
