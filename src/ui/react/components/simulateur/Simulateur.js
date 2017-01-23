import React from 'react';
import SimulateurForm from './SimulateurForm';

export default class Simulateur extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      chiffreAffaireHt: 0,
      chiffreAffaireTtc: 0,
      bindToCaHt: true,
      bindToFraisHt: true,
      fraisHt: 0,
      fraisTtc: 0,
      cfe: 1000,
      remuneration: 0,
      prevoyance: 'B',
    };
    this.handleFormChange = this.handleFormChange.bind(this);
  }

  handleFormChange(event) {
    this.setState({[event.target.name]:event.target.value});
    console.log(this.state);
  }

  render() {
    return (
      <div>
        <SimulateurForm handleFormChange={this.handleFormChange} formValues={this.state}/>
      </div>
    )
  }

}
