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
import ObjectInterfaces from "./ObjectInterfaces";

const chargesCalculator = function(params) {

  const self = {};

  self.chiffreAffaireTtc = params.chiffreAffaireTtc ? params.chiffreAffaireTtc : 0;
  self.chiffreAffaireHt = params.chiffreAffaireHt ? params.chiffreAffaireHt : 0;
  self.remuneration = params.remuneration ? params.remuneration : 0;
  self.fraisTtc = params.fraisTtc ? params.fraisTtc : 0;
  self.fraisHt = params.fraisHt ? params.fraisHt : 0;
  self.cfe = params.cfe ? params.cfe : 0;
  self.prevoyance = params.prevoyance ? params.prevoyance : A;

  self.getRemuneration = () => {
    return {
      id: "remuneration",
      type: 'result',
      organisme: 'Vous :)',
      label : 'Votre rémunération',
      montant : self.remuneration
    }
  };

  self.getfraisTtc = () => {
    return {
      id: "fraisTtc",
      type: 'result',
      organisme: 'fournisseurs',
      label : 'Frais TTC',
      montant : self.fraisTtc.toFixedNumber(2)
    }
  };

  /**
   * @returns {ResultLine}
   */
  self.getPrevoyance = () => {
    const contribution = config.getContribution('prevoyance');
    let classeChoisie = null;
    contribution.classes.forEach((classe) => {
      if (classe.classe == self.prevoyance) {
        classeChoisie = classe;
      }
    });
    contribution.label = "Prévoyance classe " + classeChoisie.classe;
    contribution.montant = classeChoisie.montant_forfaitaire;
    return new ObjectInterfaces.ResultLine(contribution);
  };

  /**
   * La tva collectée pour le compte de l'état, c'est à dire la tva des ventes
   * @return {ResultLine}
   */
  self.getTvaCollectee = () => {
    return new ObjectInterfaces.ResultLine({
      id:"tvaColllectee",
      label:"TVA collectée",
      montant:(self.chiffreAffaireTtc - self.chiffreAffaireHt).toFixedNumber(2)
    });
  };

  /**
   * La tva sur les achats, à déduire de la TVA "collectée" (celle des ventes)
   * @return {ResultLine}
   */
  self.getTvaDeductible = () => {
    return new ObjectInterfaces.ResultLine({
      id:"tvaDeductible",
      label:"TVA déductible",
      montant: (self.fraisTtc - self.fraisHt).toFixedNumber(2)
    });
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
      - self.cgsCrds().montant
      - self.getPrevoyance().montant;
  };

  /**
   * @return {ResultLine}
   */
  self.getTva = () => {
    return new ObjectInterfaces.ResultLine({
      id: 'tvaDue',
      type: 'result',
      label: 'TVA à reverser',
      organisme: 'Impots',
      montant: self.getTvaCollectee().montant - self.getTvaDeductible().montant
    });
  };

  /**
   * @return {ResultLine}
   */
  self.getCfe = () => {
    return new ObjectInterfaces.ResultLine({
      label: "CFE",
      type: 'result',
      id:"cfe",
      commentaire: "Cotisation foncière des entreprises",
      montant: self.cfe
    });
  };

  /**
   * @FIXME : on s'attend à ce que la CGS / CRDS soit là
   * Toute les cotisations sociales à l'exception de la CGS-CRDS et de la prévoyance
   * @returns {[ResultLine,ResultLine,ResultLine,ResultLine,ResultLine]}
   */
  self.getCotisationsSocialesArray = () => {
    return [
      self.retraiteBase(),
      self.retraiteComplementaire(),
      self.maladieMaternite(),
      self.formationProfessionnelle(),
      self.allocationsFamiliales()
    ];
  };

  /**
   * Obtenir le montant total des cotisations sociales
   * @returns ResultLine
   */
  self.calculerTotalCotisationsSociales = () => {
    let total = 0;
    self.getCotisationsSocialesArray().forEach(item => total += item.montant);
    return total;
  };

  /**
   * @FIXME pas besoin de retourner un {ResultLine}
   * @return {ResultLine}
   */
  self.getTotalCotisationsSociales = () => {
    return new ObjectInterfaces.ResultLine({
      id:'totalCotisationsSociales',
      label: 'Cotisations sociales',
      montant: self.calculerTotalCotisationsSociales()
    });
  };

  /**
   * Calcul des cotisations maladie et maternité - URSSAF
   * @return {ResultLine}
   */
  self.retraiteComplementaire = function() {
    const contribution = config.getContribution("retraiteComplementaire");
    const tranches = tranchesCalculator.calculerTrancheExclusive(self.remuneration, contribution.tranches);
    return new ObjectInterfaces.ResultLine(contribution).extends(tranches);
  };

  /**
   * Calcul des cotisations pour la formation professionnelle
   * @return {ResultLine}
   */
  self.formationProfessionnelle = () => {
    const contribution = config.getContribution("formationProfessionnelle");
    const tranches = tranchesCalculator.calculerTrancheExclusive(config.plafond_securite_sociale, contribution.tranches);
    return new ObjectInterfaces.ResultLine(contribution).extends(tranches);
  };

  /**
   * Calcul des cotisations maladie et maternité - URSSAF
   * https://www.urssaf.fr/portail/home/independant/je-beneficie-dexonerations/modulation-de-la-cotisation-dall.html
   * ResultLine
   */
  self.allocationsFamiliales = () => {
    const baseCalcul = self.remuneration;
    const contribution = config.getContribution("allocationsFamiliales");

    // le taux de la tranche 2 est progressif
    const tauxReduit = contribution.tranches[1].taux_reduit;
    const tauxPlein = contribution.tranches[1].taux_plein;
    const PASS = config.plafond_securite_sociale;
    // formule pour calculer le taux progressif récupérer sur le site de l'URSSAF via un png dégueulasse
    const tauxProgressif = ((tauxPlein - tauxReduit) / (0.3 * PASS)) * (baseCalcul - 1.1 * PASS) + tauxReduit;
    // voilà notre taux à appliquer pour les base de calcul comprises entre 110% et 140% du passe
    contribution.tranches[1]['taux'] = tauxProgressif;

    const tranches = tranchesCalculator.calculerTrancheExclusive(baseCalcul, contribution.tranches);
    return new ObjectInterfaces.ResultLine(contribution).extends(tranches);
  };

  /**
   * CIPAV - calcul assurance vieillesse base
   *
   */
  self.retraiteBase = () => {

    const baseCalcul = self.remuneration;
    const contribution = config.getContribution('retraiteBase');
    const line = new ObjectInterfaces.ResultLine(contribution);

    // si le revenu est inférieur ou égal à la première tranche, montant forfaitaire:
    if (baseCalcul <= contribution.montant_forfaitaire.plafond) {
      line.montant = contribution.montant_forfaitaire.montant;
      line.tranchesActives.push(new ObjectInterfaces.ContributionBracket(contribution.montant_forfaitaire));
      return line;
    }

    const tranches = tranchesCalculator.calculerTranchesCumulatives(baseCalcul, contribution.tranches);
    line.extends(tranches);
    return line;
  };

  /**
   * Calcul des cotisations maladie et maternité - URSSAF
   */
  self.maladieMaternite = () => {
    const contribution = config.getContribution("maladieMaternite");
    const baseCalcul = self.remuneration;
    const tranches = tranchesCalculator.calculerTrancheExclusive(baseCalcul, contribution.tranches);
    return new ObjectInterfaces.ResultLine(contribution).extends(tranches);
  };

  /**
   * Calcul de l'impot sur les bénéfices - Impots
   */
  self.impotSocietes = () => {
    const baseCalcul = self.getBaseCalculIs();
    const contribution = config.getContribution("impotSocietes");
    const tranches = tranchesCalculator.calculerTranchesCumulatives(baseCalcul, contribution.tranches);;
    return new ObjectInterfaces.ResultLine(contribution).extends(tranches);
  };

  /**
   * la CGS-CRDS se calcul sur la rému augmenté des autre cotisatiions sociales hors CSG-CRDS
   */
  self.cgsCrds = () => {
    const contribution = config.getContribution("cgsCrds");
    const baseCalcul = self.remuneration + self.getTotalCotisationsSociales().montant;
    const tranches = tranchesCalculator.calculerTranchesCumulatives(baseCalcul, contribution.tranches);
    return new ObjectInterfaces.ResultLine(contribution).extends(tranches);
  };

  self.getResults = () => {

    const Results = new ObjectInterfaces.Results();

    // CIPAV
    Results.addLine(self.retraiteBase());
    Results.addLine(self.retraiteComplementaire());
    Results.addLine(self.getPrevoyance());
    Results.addLine({
      id:"totalCIPAV",
      type:"subtotal",
      label:"TOTAL",
      organisme:"CIPAV",
      montant:Results.sum(['retraiteBase', 'retraiteComplementaire', 'prevoyance'])
    });

    // RSI
    Results.addLine(self.maladieMaternite());
    Results.addLine({
      id:"totalRSI",
      type:"subtotal",
      label:"TOTAL",
      organisme:"RSI",
      montant:Results.sum(['maladieMaternite'])
    });

    // URSSAF
    Results.addLine(self.formationProfessionnelle());
    Results.addLine(self.allocationsFamiliales());
    Results.addLine(self.cgsCrds());
    Results.addLine({
      id:"totalURSSAF",
      type:"subtotal",
      label:"TOTAL",
      organisme:"URSSAF",
      montant:Results.sum(['formationProfessionnelle', 'cgsCrds', 'allocationsFamiliales'])
    });

    // Sous-total des cotisations sociales.
    Results.addLine({
      type:"subtotal",
      id:'totalCotisationSociales',
      label:"TOTAL DES COTISATIONS SOCIALES",
      montant:Results.sum(['totalURSSAF', 'totalRSI', 'totalCIPAV'])
    });

    // IS, TVA & CFE
    Results.addLine(self.impotSocietes());
    Results.addLine(self.getTva());
    Results.addLine(self.getCfe());

    Results.addLine(self.getRemuneration());
    Results.addLine(self.getfraisTtc());

    // le total de toutes les lignes précédemment ajoutées
    Results.addLine({
      id:'total',
      type:"total",
      label:'TOTAL DEBIT PREVISIONNEL',
      montant:Results.getTotal()
    });

    Results.addLine({
      id:"resteEnBanque",
      type:'total',
      hidden: true,
      label: "Restera en Banque (CA TTC - Dettes)",
      montant: (self.chiffreAffaireTtc - Results.getTotal()).toFixedNumber(2)
    });

    return Results;

  };

  return self;

};

export default chargesCalculator;
