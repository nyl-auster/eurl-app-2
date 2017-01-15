/**
 * Calculs des charges d'une EURL en fonction de la configuration
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
import objectInterfaces from "./objectInterfaces";

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

    const contribution = config.getContribution('prevoyance');

    let classeChoisie = null;
    contribution.classes.forEach((classe) => {
      if (classe.classe == self.prevoyance) {
        classeChoisie = classe;
      }
    });

    const charge = {};
    if (classeChoisie) {
      charge.label = "Prévoyance classe " + classeChoisie.classe;
      charge.montant = classeChoisie.montant_forfaitaire;
    }
    else {
      charge.montant = contribution.classes[0].montant_forfaitaire;
    }

    const ResultLine = new objectInterfaces.ResultLine(contribution);
    ResultLine.extends(charge);
    return ResultLine;
  };

  /**
   * La tva collectée pour le compte de l'état, c'est à dire la tva des ventes
   * @returns {number}
   */
  self.getTvaCollectee = () => {
    const ResultLine = new objectInterfaces.ResultLine();
    const montant = (self.chiffreAffaireTtc - self.chiffreAffaireHt).toFixedNumber(2);
    ResultLine.extends({montant});
    return ResultLine;
  };

  /**
   * La tva sur les achats, à déduire de la TVA "collectée" (celle des ventes)
   * @returns {number}
   */
  self.getTvaDeductible = () => {
    const ResultLine = new objectInterfaces.ResultLine();
    ResultLine.extends({
      montant: self.fraisTtc - self.fraisHt
    });
    return ResultLine;
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
    return new objectInterfaces.ResultLine().extends({
      label: 'TVA à reverser',
      organisme: 'Impots',
      montant: self.getTvaCollectee().montant - self.getTvaDeductible().montant
    });
  };

  /**
   * Pseudo charge
   */
  self.getCfe = () => {
    return new objectInterfaces.ResultLine().extends({
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
    return new objectInterfaces.ResultLine().extends({
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

    return new objectInterfaces.ResultLine().extends({
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
    return new objectInterfaces.ResultLine().extends({
      label: 'Cotisations sociales',
      montant: self.calculerTotalCotisationsSociales()
    });
  };

  /**
   * Calcul des cotisations maladie et maternité - URSSAF
   */
  self.getAssuranceVieillesseComplementaire = function(baseCalcul) {
    const contribution = config.getContribution("retraiteComplementaire");
    const ResultLine = new objectInterfaces.ResultLine(contribution);
    ResultLine.extends(tranchesCalculator.calculerTrancheExclusive(baseCalcul, contribution.tranches));
    return ResultLine;
  };

  /**
   * Calcul des cotisations pour la formation professionnelle
   */
  self.getFormationProfessionnelle = () => {
    const contribution = config.getContribution("formationProfessionnelle");
    const ResultLine = new objectInterfaces.ResultLine(contribution);
    ResultLine.extends(tranchesCalculator.calculerTrancheExclusive(config.plafond_securite_sociale, contribution.tranches));
    return ResultLine;
  };

  /**
   * Calcul des cotisations maladie et maternité - URSSAF
   * https://www.urssaf.fr/portail/home/independant/je-beneficie-dexonerations/modulation-de-la-cotisation-dall.html
   */
  self.getAllocationsFamiliales = (baseCalcul) => {

    const contribution = config.getContribution("allocationsFamiliales");

    // le taux de la tranche 2 est progressif
    const tauxReduit = contribution.tranches[1].taux_reduit;
    const tauxPlein = contribution.tranches[1].taux_plein;
    const PASS = config.plafond_securite_sociale;
    // formule pour calculer le taux progressif récupérer sur le site de l'URSSAF via un png dégueulasse
    const tauxProgressif = ((tauxPlein - tauxReduit) / (0.3 * PASS)) * (baseCalcul - 1.1 * PASS) + tauxReduit;
    // voilà notre taux à appliquer pour les base de calcul comprises entre 110% et 140% du passe
    contribution.tranches[1]['taux'] = tauxProgressif;

    const ResultLine = new objectInterfaces.ResultLine(contribution);
    ResultLine.extends(tranchesCalculator.calculerTrancheExclusive(baseCalcul, contribution.tranches));
    return ResultLine;
  };

  /**
   * CIPAV - calcul assurance vieillesse base
   *
   */
  self.getAssuranceVieillesseBase = (baseCalcul) => {
    let assuranceVieillesseBase = config.getContribution('retraiteBase');
    const line = new objectInterfaces.ResultLine(assuranceVieillesseBase);
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
    const contribution = config.getContribution("maladieMaternite");
    const ResultLine = new objectInterfaces.ResultLine(contribution);
    ResultLine.extends(tranchesCalculator.calculerTrancheExclusive(baseCalcul, contribution.tranches));
    return ResultLine;
  };

  /**
   * Calcul de l'impot sur les bénéfices - Impots
   */
  self.getImpotSurLesSocietes = () => {
    const contribution = config.getContribution("impotSocietes");
    const ResultLine = new objectInterfaces.ResultLine(contribution);
    ResultLine.extends(tranchesCalculator.calculerTranchesCumulatives(self.getBaseCalculIs(), contribution.tranches));
    return ResultLine;
  };

  /**
   * la CGS-CRDS se calcul sur la rému augmenté des autre cotisatiions sociales hors CSG-CRDS
   */
  self.getCgsCrds = () => {
    const contribution = config.getContribution("cgsCrds");
    const baseCalcul = self.remuneration + self.getTotalCotisationsSociales().montant;
    let tranches = tranchesCalculator.calculerTranchesCumulatives(baseCalcul, contribution.tranches);
    const ResultLine = new objectInterfaces.ResultLine(contribution);
    ResultLine.extends(tranches);
    return ResultLine;
  };

  self.getAll = () => {
    let lines = [];
    lines = lines.concat(self.getCotisationsSocialesArray());
    lines.push(self.getCgsCrds());
    lines.push(self.getPrevoyance());
    lines.push(self.getImpotSurLesSocietes());
    lines.push(self.getTva());
    lines.push(self.getCfe());
    lines.push(objectInterfaces.getTotalLine(lines));
    return lines;
  };

  return self;

};

export default chargesCalculator;
