import React from 'react';
import SimulateurForm from './SimulateurForm';
import SimulateurResultsSynthese from './SimulateurResultsSynthese';
import SimulateurResultsTable from './SimulateurResultsTable';
import chargesCalculator from "src/services/chargesCalculator";

export default class Simulateur extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      // résultats du calculator
      Results: {},
      resultClasses: '',
      // paramètres par défaut du calculator
      calculatorParams: {
        chiffreAffaireHt: 0,
        chiffreAffaireTtc: 0,
        fraisHt: 0,
        fraisTtc: 0,
        cfe: 500,
        remuneration: 0,
        prevoyance: 'A'
      }
    };
    this.onFormChange = this.onFormChange.bind(this);
  }

  componentWillMount() {
    this.calculateResults(this.state.calculatorParams);
  }

  calculateResults(params) {
    const Results = chargesCalculator(params);
    this.setState({Results:Results.getResults()});
  }

  onFormChange(formValues) {
    const calculatorParams = Object.assign({}, this.state.calculatorParams);
    for (const property in formValues) {
      if (calculatorParams.hasOwnProperty(property)) {
        calculatorParams[property] = formValues[property];
      }
    }
    this.setState({calculatorParams});
    this.calculateResults(calculatorParams);
  }

  render() {
    return (
      <div id="simulateur">
        <SimulateurForm defaultFormValues={this.state.calculatorParams} onFormChange={this.onFormChange}/>
        <SimulateurResultsSynthese Results={this.state.Results} />
        <div className="row">
          <div className="small-12 columns">
            <SimulateurResultsTable Results={this.state.Results} />
          </div>
        </div>
      </div>
    )
  }

}
