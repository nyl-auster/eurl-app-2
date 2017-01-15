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
  this.id = "";
  this.label = "";
  this.taux = "";
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
  if(!datas.id) {
    throw "Un id est obligatoire pour l'objet ResultLine";
  }
  this.extends(datas);
  return this;
};

/**
 * @param resultLines array d'objects ResultLine
 * @constructor
 */
const Results = function() {

  this.lines = [];
  // l'index de
  this.lineComputedIndex = 0;
  // le total de toutes les lignes
  this.total = 0;

  this.tmpTotal = 0;

  this.addLine = function(ResultLine) {
    this.lines.push(ResultLine);
    if('subtotal' !== ResultLine.type) {
      this.total += ResultLine.montant;
    }
  };


  /**
   * Fais le sous-total automatique des lignes précédentes
   * depuis le dernier sous total.
   * @param datas
   * @return {number} soustotal calculé
   */
  this.automaticSubTotal = function(datas) {

    let subtotal = 0;

    for (this.lineComputedIndex; this.lineComputedIndex < this.lines.length ; this.lineComputedIndex++) {
      if('subtotal' !== this.lines[this.lineComputedIndex].type) {
        subtotal += this.lines[this.lineComputedIndex].montant;
      }
    }

    console.log(this.lineComputedIndex, this.lines[this.lineComputedIndex]);

    this.addLine(new ResultLine(datas).extends({
      type:'subtotal',
      montant: subtotal.toFixedNumber(2)
    }));
    return subtotal.toFixedNumber(2);
  };

  this.getLineById = function(ResultLineId) {
    let result = null;
    this.ResultLines.forEach(function(ResultLine) {
      if (ResultLineId == ResultLine.id) {
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
