import React from 'react';
import SimulateurForm from './SimulateurForm';
import chargesCalculator from "src/services/chargesCalculator";

export default class Simulateur extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      // résultats du calculator
      Results: {},
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

  componentDidMount() {
    this.calculateResults();
  }

  calculateResults() {
    const Results = chargesCalculator(this.state).getResults(this.state.calculatorParams);
    console.log(Results);
    this.setState({Results:Results});
  }

  onFormChange(formValues) {
    const calculatorParams = Object.assign({}, this.state.calculatorParams);
    for (const property in formValues) {
      if (calculatorParams.hasOwnProperty(property)) {
        calculatorParams[property] = formValues[property];
      }
    }
    this.setState({calculatorParams})
  }

  render() {
    return (
      <div>
        <SimulateurForm defaultFormValues={this.state.calculatorParams} onFormChange={this.onFormChange}/>
      </div>
    )
  }

}
