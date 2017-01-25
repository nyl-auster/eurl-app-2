import React from 'react';
import chargesConfig from "src/services/config";

export default class SimulateurResultsTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showDetails:false,
      plafondMax:chargesConfig.plafondMax
    };
    this.handleShowDetailsClick = this.handleShowDetailsClick.bind(this);
  }

  handleShowDetailsClick() {
    this.setState({showDetails:!this.state.showDetails});
  }

  render() {
    return (
      <div className="results">

        <table className="table lines-results">
          <caption>
            A PAYER PAR VOTRE EURL <br/><a className="showDetails" onClick={this.handleShowDetailsClick}> {this.state.showDetails ? 'Masquer' : 'Montrer'}  les détails des calculs</a>
          </caption>
          <thead>
            <tr>
              <th> Nom </th>
              <th className="show-for-large"> Organisme </th>
              <th className="show-for-large"> Tranche </th>
              <th className="show-for-large"> Tranche Base de calcul </th>
              <th className="show-for-large"> Tranche taux </th>
              <th className="show-for-large"> Tranche forfait </th>
              <th className="show-for-large"> tranche plafond </th>
              <th className="montant"> Montant </th>
            </tr>
          </thead>

          {this.props.Results.lines.map((line, resultIndex) => {
            return (
              <tbody key={'result-' + resultIndex} className="lines-results__result">

                <tr>
                  <td> {line.label} </td>
                  <td className="show-for-large" colSpan="6"> {line.organisme} </td>
                  <td className="montant"> {line.montant } </td>
                </tr>

                {line.tranchesActives && line.tranchesActives.map((tranche, trancheIndex) => {
                  return (
                    <tr key={'tranche-' + trancheIndex} style={this.state.showDetails ? {display:'inherit'} : {display:'none'}} className="lines-results__result__details show-for-large">
                      <td colSpan="2"></td>
                      <td> { tranche.label} </td>
                      <td> { tranche.baseCalcul } </td>
                      <td> { tranche.taux} <span>%</span> </td>
                      <td> { tranche.montant_forfaitaire }</td>
                      <td> { tranche.plafond == this.state.plafondMax ? ' - ' : (tranche.plafond) } </td>
                      <td className="montant"> { tranche.montant } </td>
                    </tr>
                  )
                })}
              </tbody>
            )
          })}

        </table>
      </div>
    )
  }

}
