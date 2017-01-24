import React from 'react';
import SimulateurForm from './SimulateurForm';

export default class Simulateur extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      calculatorParams: {}
    }
    this.onFormChange = this.onFormChange.bind(this);
  }

  onFormChange(formValues) {
    console.log(formValues);
    //console.log(formValues);
    for (const property in formValues) {
      //this.setState({[property]:params[property]});
    }
  }

  updateCalculatorParams(params) {
    for (const property in params) {
     // this.setState({[property]:params[property]});
    }
  }

  render() {
    return (
      <div>
        <SimulateurForm onFormChange={this.onFormChange}/>
      </div>
    )
  }

}
