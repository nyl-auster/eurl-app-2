import React from 'react';
import SimulateurForm from './SimulateurForm';

export default class Simulateur extends React.Component {


  constructor(props) {
    super(props);
    //..this.handleFormChange = this.handleFormChange.bind(this);
  }


  getFormCHanges(formValues) {
    console.log(formValues);
  }

  render() {
    return (
      <div>
        <SimulateurForm getFormChanges={this.getFormChanges}/>
      </div>
    )
  }

}
