import React from 'react';

export default class SimulateurResultsTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showDetails:false
    }
  }

  render() {
    return (
      <div className="results">

        <table className="table lines-results">
          <caption>
            A PAYER PAR VOTRE EURL <br/><a className="showDetails"> {this.showDetails ? 'Masquer' : 'Montrer'}  les détails des calculs</a>
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

          <tbody className="lines-results__result">

            {this.props.Results.lines.map(function(line, index) {
              return <tr key={index}>
                <td> {line.label} </td>
                <td className="show-for-large" colSpan="6"> {line.organisme} </td>
                <td className="montant"> {line.montant } </td>
              </tr>
            })}

            {/*
             <tr v-show="showDetails" className="lines-results__result__details show-for-large" v-for="(tranche, $index) in line.tranchesActives">

             <td colspan="2"></td>
             <td> {{tranche.label}} </td>
             <td> {{tranche.baseCalcul }} </td>
             <td> {{tranche.taux}} <span v-show="tranche.taux">%</span> </td>
             <td> {{tranche.montant_forfaitaire }}</td>
             <td> {{tranche.plafond == plafondMax ? ' - ' : (tranche.plafond ) }} </td>
             <td className="montant"> {{tranche.montant }} </td>
             </tr>
             */}

          </tbody>


        </table>
      </div>
    )
  }

}
