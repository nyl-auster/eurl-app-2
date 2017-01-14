/**
 * Calculs des charges d'une EURL en fonction des paramètres
 *
 * Les méthodes de ce services enrichit les objets de type charges
 * tels que définit dans le fichier de configuration des charges, avec commes clefs obligatoires.
 * La clef "tranchesActives" indique les tranches qui sont appliquées à notre base de calcul
 *
 * return {
 *   label:"nom de la charge"
 *   montant:7,
 *   tranchesActives: [
 *     {
 *       label: "Tranche 1",
 *       montant: 8,
 *     }
 *   ]
 * }
 */

/**
 * @param params object avec les propriétés suivantes:
 *
 * - chiffreAffaireHt
 * - chiffreAffaireTtc
 * - remuneration
 * - fraisTtc
 * - cfe
 * - tva à reverser
 * - prevoyance
 */

import config from "./config";
import tranchesCalculator from "./chargesTranchesCalculator";
import resultsInterface from "./resultsInterface";

const chargesCalculator = function(params) {

  const self = {};

  self.chiffreAffaireTtc = params.chiffreAffaireTtc;
  self.chiffreAffaireHt = params.chiffreAffaireHt;
  self.remuneration = params.remuneration;
  self.fraisTtc = params.fraisTtc;
  self.fraisHt = params.fraisHt;
  self.cfe = params.cfe;
  self.prevoyance = params.prevoyance;

  /**
   * @FIXME à réecrire clean
   * @returns {*}
   */
  self.getPrevoyance = () => {
    let line = new resultsInterface.Line();
    let classeChoisie = null;
    config.prevoyance.classes.forEach((classe) => {
      if (classe.classe == self.prevoyance) {
        classeChoisie = classe;
      }
    });

    let charge = config.prevoyance;
    if (classeChoisie) {
      charge.label = "Prévoyance classe " + classeChoisie.classe;
      charge.montant = classeChoisie.montant_forfaitaire;
    }
    else {
      charge.montant = config.prevoyance.classes[0].montant_forfaitaire;
    }
    line.extends(config.prevoyance);
    line.extends(charge);
    return line;
  };

  /**
   * La tva collectée pour le compte de l'état, c'est à dire la tva des ventes
   * @returns {number}
   */
  self.getTvaCollectee = () => {
    const line = new resultsInterface.Line();
    const montant = (self.chiffreAffaireTtc - self.chiffreAffaireHt).toFixedNumber(2)
    line.extends({montant});
    return line;
  };

  /**
   * La tva sur les achats, à déduire de la TVA "collectée" (celle des ventes)
   * @returns {number}
   */
  self.getTvaDeductible = () => {
    const line = new resultsInterface.Line();
    line.extends({
      montant: self.fraisTtc - self.fraisHt
    });
    return line;
  };

  /**
   * Otenir la base de calcul pour l'impot sur les sociétés.
   * La base de calcul est le résultat fiscal (résultat comptable + charges non déductibles)
   * Le résultat comptable, ce sont les produits moins les charges
   * @returns {number}
   */
  self.getBaseCalculIs = () => {
    return self.chiffreAffaireHt
      - self.remuneration
      - self.fraisHt
      - self.getTotalCotisationsSociales().montant
      - self.getCfe().montant
      - self.getCgsCrds().montant
      - self.getPrevoyance().montant;
  };

  self.getTva = () => {
    return new resultsInterface.Line().extends({
      label: 'TVA à reverser',
      organisme: 'Impots',
      montant: self.getTvaCollectee().montant - self.getTvaDeductible().montant
    });
  };

  /**
   * Pseudo charge
   */
  self.getCfe = () => {
    return new resultsInterface.Line().extends({
      label: "CFE",
      commentaire: "Cotisation foncière des entreprises",
      montant: self.cfe
    });
  };

  /**
   * pseudo charge
   * @returns {{label: string, montant: (number|*)}}
   */
  self.getfraisTtc = () => {
    return new resultsInterface.Line().extends({
      label: 'fraisTtc',
      montant: self.fraisTtc
    });
  };

  /**
   * Ce qu'il nous reste en banque à partir de notre TTC après avoir
   * - payé tout ce que l'on devait
   * - payé notre rémunération
   * - payé nos frais TTC
   * @returns {{label: string, montant: number}}
   */
  self.getResteEnBanque = () => {
    const montant = self.chiffreAffaireTtc
      - self.fraisTtc
      - self.remuneration
      - self.getTotalAProvisionner().montant;
    return new resultsInterface.Line().extends({
      label: "Reste en Banque",
      montant: montant
    });
  };

  /**
   * Toute les cotisations sociales à l'exception de la CGS-CRDS et de la prévoyance
   * @returns {[*,*,*,*,*]}
   */
  self.getCotisationsSocialesArray = () => {
    return [
      self.getAssuranceVieillesseBase(self.remuneration),
      self.getAssuranceVieillesseComplementaire(self.remuneration),
      self.getMaladiesMaternite(self.remuneration),
      self.getFormationProfessionnelle(self.remuneration),
      self.getAllocationsFamiliales(self.remuneration)
    ];
  };

  /**
   * Obtenir le montant total des cotisations sociales
   * @returns {number}
   */
  self.calculerTotalCotisationsSociales = () => {
    let total = 0;
    self.getCotisationsSocialesArray().forEach(item => total += item.montant);
    return total;
  };

  /**
   * Le total a provisionner, ce pour quoi j'ai créer l'application
   * c'est à dire ce qui devra être payé un jour ou l'autre, peu
   * nous importe la date d'ailleurs peu prédictible.
   * à un moement donné.
   * @returns {*}
   */
  self.getTotalAProvisionner = () => {
    let total = self.getCfe().montant
      + self.getTva().montant
      + self.getTotalCotisationsSociales().montant
      + self.getCgsCrds().montant
      + self.getPrevoyance().montant
      + self.getImpotSurLesSocietes().montant;
    return {
      id: 'totalAProvisionner',
      label: 'Total à provisionner',
      montant: total
    };
  };

  self.getTotalCotisationsSociales = () => {
    return new resultsInterface.Line().extends({
      label: 'Cotisations sociales',
      montant: self.calculerTotalCotisationsSociales()
    });
  };

  /**
   * Calcul des cotisations maladie et maternité - URSSAF
   */
  self.getAssuranceVieillesseComplementaire = function(baseCalcul) {
    const line = new resultsInterface.Line()
      .extends(config.assuranceVieillesseComplementaire)
      .extends(tranchesCalculator.calculerTrancheExclusive(baseCalcul, config.assuranceVieillesseComplementaire.tranches));
    return line;
  };

  /**
   * Calcul des cotisations pour la formation professionnelle
   */
  self.getFormationProfessionnelle = () => {
    const line = new resultsInterface.Line()
      .extends(config.formationProfessionnelle)
      .extends(tranchesCalculator.calculerTrancheExclusive(config.plafond_securite_sociale, config.formationProfessionnelle.tranches));
    return line;
  };

  /**
   * Calcul des cotisations maladie et maternité - URSSAF
   * https://www.urssaf.fr/portail/home/independant/je-beneficie-dexonerations/modulation-de-la-cotisation-dall.html
   */
  self.getAllocationsFamiliales = (baseCalcul) => {

    const line = new resultsInterface.Line();
    const allocationsFamiliales = config.allocationsFamiliales;

    // le taux de la tranche 2 est progressif
    const tauxReduit = allocationsFamiliales.tranches[1].taux_reduit;
    const tauxPlein = allocationsFamiliales.tranches[1].taux_plein;
    const PASS = allocationsFamiliales.plafond_securite_sociale;
    // formule pour calculer le taux progressif récupérer sur le site de l'URSSAF via un png dégueulasse
    const tauxProgressif = ((tauxPlein - tauxReduit) / (0.3 * PASS)) * (baseCalcul - 1.1 * PASS) + tauxReduit;
    // voilà notre taux à appliquer pour les base de calcul comprises entre 110% et 140% du passe
    allocationsFamiliales.tranches[1]['taux'] = tauxProgressif;

    line
      .extends(allocationsFamiliales)
      .extends(tranchesCalculator.calculerTrancheExclusive(baseCalcul, allocationsFamiliales.tranches));

    return line;
  };

  /**
   * CIPAV - calcul assurance vieillesse base
   *
   */
  self.getAssuranceVieillesseBase = (baseCalcul) => {
    const line = new resultsInterface.Line();
    line.extends(config.assuranceVieillesseBase);
    let assuranceVieillesseBase = config.assuranceVieillesseBase;
    // si le revenu est inférieur ou égal à la première tranche, montant forfaitaire:
    if (baseCalcul <= assuranceVieillesseBase.montant_forfaitaire.plafond) {
      return line.extends({montant:assuranceVieillesseBase.montant_forfaitaire.montant});
    }
    else {
      if (baseCalcul <= assuranceVieillesseBase.tranches[0].plafond) {
        line.montant = baseCalcul * (assuranceVieillesseBase.tranches[0].taux/100);
      }
      else {
        line.montant =  baseCalcul * (assuranceVieillesseBase.tranches[0].taux/100) + baseCalcul * (assuranceVieillesseBase.tranches[1].taux/100);
      }
      return line;
    }
  };

  /**
   * Calcul des cotisations maladie et maternité - URSSAF
   */
  self.getMaladiesMaternite = (baseCalcul) => {
    const line = new resultsInterface.Line()
      .extends(config.maladiesMaternite)
      .extends(tranchesCalculator.calculerTrancheExclusive(baseCalcul, config.maladiesMaternite.tranches));
    return line;
  };

  /**
   * Calcul de l'impot sur les bénéfices - Impots
   */
  self.getImpotSurLesSocietes = () => {
    const line = new resultsInterface.Line();
    line.extends(config.impotSurLesSocietes);
    line.extends(tranchesCalculator.calculerTranchesCumulatives(self.getBaseCalculIs(), config.impotSurLesSocietes.tranches));
    return line;
  };

  /**
   * la CGS-CRDS se calcul sur la rému augmenté des autre cotisatiions sociales hors CSG-CRDS
   */
  self.getCgsCrds = () => {
    const line = new resultsInterface.Line();
    const baseCalcul = self.remuneration + self.getTotalCotisationsSociales().montant;
    let tranches = tranchesCalculator.calculerTranchesCumulatives(baseCalcul, config.cgsCrds.tranches);
    line.extends(config.cgsCrds).extends(tranches);
    return line;
  };

  self.getAll = () => {
    let lines = [];
    lines = lines.concat(self.getCotisationsSocialesArray());
    lines.push(self.getCgsCrds());
    lines.push(self.getPrevoyance());
    lines.push(self.getImpotSurLesSocietes());
    lines.push(self.getTva());
    lines.push(self.getCfe());
    lines.push(resultsInterface.getTotalLine(lines));
    return lines;
  };

  return self;

};

export default chargesCalculator;
