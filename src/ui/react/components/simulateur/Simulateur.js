import React from 'react';
import SimulateurForm from './SimulateurForm';

export default class Simulateur extends React.Component {

  constructor(props) {
    super(props);
    this.state = {calculatorParams: {}}
    this.onCallback = this.onCallback.bind(this);
  }

  onCallback(formValues) {
    this.setState({calculatorParams:formValues});
  }

  render() {
    return (
      <div>
        <SimulateurForm onCallback={this.onCallback}/>
      </div>
    )
  }

}
