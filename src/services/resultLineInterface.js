/**
 * Formalisation de l'objet "resultLine"
 * @param object object
 * @return object
 */

var ResultLine = function() {

  this.extends = function(datas) {
    for (let property in datas) {
      if (datas.hasOwnProperty(property)) {
        this[property] = datas[property];
      }
    }
    return this;
  };

  this.includeInTotal = true;
  this.order = 0;
  this.label = "";
  this.organisme= "";
  this.baseCalcul = 0;
  this.montant = 0;
  this.tranches = [];
  this.tranchesActives = [];
  this.commentaire = "";
  this.details = [];
};

const getTotalLine = function(resultLines) {
  console.log(resultLines);
  let total = 0;
  resultLines.forEach(function(resultLine){
    total += resultLine.montant;
  });
  return new ResultLine().extends({
    class:"total",
    label: 'Total',
    montant: total.toFixedNumber(2)
  });
};

export default {
  ResultLine,
  getTotalLine
};
