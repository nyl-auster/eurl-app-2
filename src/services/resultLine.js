/**
 * Formalisation de l'objet "resultLine"
 * @param object object
 * @return object
 */
const resultLine = function() {

  this.extends = function(datas) {
    for (let property in datas) {
      if (datas.hasOwnProperty(property)) {
        this[property] = datas[property];
      }
    }
    return this;
  };

  this.label = "";
  this.organisme= "";
  this.baseCalcul = 0;
  this.montant = 0;
  this.tranches = [];
  this.tranchesActives = [];
  this.commentaire = "";
  this.details = [];

};


export default resultLine;
