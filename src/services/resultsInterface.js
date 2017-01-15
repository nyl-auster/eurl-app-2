/**
 * Formalisation de l'objet "resultLine"
 * @param object object
 * @return object
 */

const Line = function() {

  this.includeInTotal = true;
  this.order = 0;
  this.label = "";
  this.organisme= "";
  this.baseCalcul = 0;
  this.montant = 0;
  this.tranches = [];``
  this.tranchesActives = [];
  this.commentaire = "";

  this.extends = function(datas) {
    for (let property in datas) {
      if (datas.hasOwnProperty(property)) {
        this[property] = datas[property];
      }
    }
    return this;
  };

};

const getTotalLine = function(resultLines) {
  let total = 0;
  resultLines.forEach(function(resultLine){
    if (resultLine.montant) {
      total += resultLine.montant;
    }
  });
  console.log(resultLines);
  return new Line().extends({
    class:"total",
    label: 'Total',
    montant: total.toFixedNumber(2)
  });

};

export default {
  Line,
  getTotalLine
};
