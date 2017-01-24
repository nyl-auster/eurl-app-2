import React from 'react';

export default class SimulateurForm extends React.Component {

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
      bindToCaHt:true
    };
    this.handleFormChange = this.handleFormChange.bind(this);
  }

  handleFormChange(event) {

    const newState = {};

    newState[event.target.name] = event.target.value;

    // si on est en tranche de cocher / décocher la checkbox bindToCaHt
    if (event.target.name === 'bindToCaHt') {
      // on prend l'attribut "checked" au lieu de "value" car c'est une checkbox
      newState.bindToCaHt = event.target.checked;
      // si elle est cochée, on calcule automatiquement le TTC à partir du HT
      if (event.target.checked){
        newState.chiffreAffaireTtc = this.state.chiffreAffaireHt * 0.20;
      }
    }

    // si on est en tranche de cocher / décocher la checkbox bindToCaHt
    if (event.target.name === 'bindToFraisHt') {
      // on prend l'attribut "checked" au lieu de "value" car c'est une checkbox
      newState.bindToFraisHt = event.target.checked;
      // si elle est cochée, on calcule automatiquement le TTC à partir du HT
      if (event.target.checked){
        newState.fraisTtc = this.state.fraisHt * 0.20;
      }
    }

    if (event.target.name === 'chiffreAffaireHt' && this.state.bindToCaHt === true) {
      newState.chiffreAffaireTtc = event.target.value * 0.20;
    }

    if (event.target.name === 'fraisHt' && this.state.bindToFraisHt === true) {
      newState.fraisTtc = event.target.value * 0.20;
    }

    this.setState(newState);

    this.props.onCallback(newState);
  }

  render() {
    return (
      <form className="simulator-form" onChange={this.handleFormChange}>

        {/*
         <div className="callout text-center">
         <button className="close-button" aria-label="Close alert" type="button">
         <span aria-hidden="true">&times;</span>
         </button>
         <em>Entrez ci-dessous les chiffres correspondant à vos estimations sur une période d'un an.</em>
         </div>
         */}

        <div className="row">

          {/*Chiffres d'affaires HT */}
          <div className="large-3 small-12 columns">
            <label htmlFor="chiffre-affaire-ht">Chiffre d'affaires HT</label>
            <input type="text" name="chiffreAffaireHt" defaultValue={this.state.chiffreAffaireHt} id="chiffre-affaire-ht"/>
            <div className="simulator-form__field__description">
              Votre chiffre d'affaires sans la TVA de vos ventes. C'est une base de calcul pour certaines des charges.
            </div>
          </div>

          {/*Chiffre d'affaire TTC */}
          <div className="large-3 small-12 columns">
            <label htmlFor="chiffre-affaire-ttc">Chiffre d'affaires TTC</label>
            <input value={this.state.chiffreAffaireTtc} name="chiffreAffaireTtc" type="text" id="chiffre-affair‡e-ttc" />
            <div className="simulator-form__field__description">
              <input name="bindToCaHt" defaultChecked={this.state.bindToCaHt} type="checkbox" /> <em>automatiquement à 20% du HT</em> <br />
              Le total des ventes de la société en incluant la TVA.
            </div>
          </div>

          {/*frais HT */}
          <div className="large-3 small-12 columns">
            <label htmlFor="frais-ht"> Frais HT </label>
            <input defaultValue={this.state.fraisHt} step="any"  name="fraisHt"  type="text" id="frais-ht" />
            <div className="simulator-form__field__description">
              Vos dépenses de sociétés <strong>hors taxe</strong> : expertise comtpable, achats, fournisseurs etc ...
            </div>
          </div>

          {/*frais TTC*/}
          <div className="large-3 small-12 columns">
            <label htmlFor="frais-ttc"> Frais TTC </label>
            <input value={this.state.fraisTtc} name="fraisTtc" type="text" id="frais-ttc" className="form-control" />
            <div className="simulator-form__field__description">
              <input name="bindToFraisHt" defaultChecked={this.state.bindToFraisHt} type="checkbox" />
              <em>automatiquement à 20% du HT</em> <br />
              <div className="">
                Vos dépenses de sociétés avec la TVA : expertise comptable, achats, fournisseurs etc ...
              </div>
            </div>
          </div>


          {/*CFE */}
          <div className="large-3 small-12 columns">
            <label htmlFor="cfe"> CFE à verser </label>
            <input defaultValue={this.state.cfe} name="cfe" type="text" id="cfe" placeholder="CFE" />
            <div className="simulator-form__field__description">
              Vous devez verser une cotisation foncière des entreprises, dont le montant dépend de votre commune.
            </div>
          </div>

          {/*Rémunération */}
          <div className="large-3 small-12 columns">
            <label htmlFor="remuneration"> Rémunération </label>
            <input defaultValue={this.state.remuneration}  name="remuneration" id="remuneration" type="text" placeholder="Rémunération" />
            <div className="simulator-form__field__description">
              Votre rémunération en tant que gérant. Les cotisations sociales sont calculées sur cette base.
            </div>
          </div>

          <div className="large-3 small-12 columns end">
            <label> Prévoyance </label>
            <select name="prevoyance" value={this.state.prevoyance} id="prevoyance" type="text">
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
            <div className="simulator-form__field__description">
              Assurance vie.
            </div>
          </div>

        </div>

      </form>
    )
  }
}
