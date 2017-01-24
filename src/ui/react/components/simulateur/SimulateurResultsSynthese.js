import React from 'react';

export default class SimulateurResultsSynthese extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="row big-picture">
        <div className="small-12 medium-6 columns">
          <h2 className="total-a-provisionner">TOTAL A PROVISIONNER <br/><span className="subheader">HORS REMUNERATION ET FRAIS</span></h2>
          <h3>C'est le total de l'argent à provisionner pour pouvoir honorer vos impots et cotisations. Ce total n'inclut donc pas votre rémunération et vos frais.</h3>
          <p>
            <span className="result test--a-provisionner-result">{this.props.Results.getLine('totalContributions').montant} €</span>
          </p>
        </div>
        <div className="small-12 medium-6 columns">
          <h2 className="solde">SOLDE RESTANT<br/><br/></h2>
          <h3>C'est ce qu'il restera de votre chiffre d'affaires TTC une fois retiré l'intégralité de ce que votre société doit payer ( rémunération et frais TTC inclus )</h3>
          <p>
            <span className="result test--solde-result">{this.props.Results.getLine('resteEnBanque').montant} €</span>
          </p>
        </div>
      </div>
    )
  }

}
