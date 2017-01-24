import React from 'react';
import _ from "lodash"

export default class SimulateurForm extends React.Component {

  constructor(props) {

    super(props);
    this.state = {
      formValues: {
        chiffreAffaireHt: 0,
        chiffreAffaireTtc: 0,
        bindToCaHt: true,
        bindToFraisHt: true,
        fraisHt: 0,
        fraisTtc: 0,
        cfe: 1000,
        remuneration: 0,
        prevoyance: 'B',
        bindToCaHt: true
      }
    };

    // si on envoie des valeurs par défaut, on merge celle de notre composant
    if (props.hasOwnProperty('defaultFormValues')) {
      Object.assign(this.state.formValues, props.defaultFormValues);
    }
    this.handleFormChange = this.handleFormChange.bind(this);
  }

  handleFormChange(event) {

    // on fait attention à ne pas muter this.state directement
    // car setState pourrait overrider ces modifications
    const formValues = Object.assign({}, this.state.formValues);

    formValues[event.target.name] = event.target.value;

    // si on est en tranche de cocher / décocher la checkbox bindToCaHt
    if (event.target.name === 'bindToCaHt') {
      // on prend l'attribut "checked" au lieu de "value" car c'est une checkbox
      formValues.bindToCaHt = event.target.checked;
      // si elle est cochée, on calcule automatiquement le TTC à partir du HT
      if (event.target.checked){
        formValues.chiffreAffaireTtc = _.round(this.state.formValues.chiffreAffaireHt * 0.20);
      }
    }

    // si on est en tranche de cocher / décocher la checkbox bindToCaHt
    if (event.target.name === 'bindToFraisHt') {
      // on prend l'attribut "checked" au lieu de "value" car c'est une checkbox
      formValues.bindToFraisHt = event.target.checked;
      // si elle est cochée, on calcule automatiquement le TTC à partir du HT
      if (event.target.checked){
        formValues.fraisTtc = _.round(this.state.formValues.fraisHt * 0.20, 2);
      }
    }

    if (event.target.name === 'chiffreAffaireHt' && this.state.formValues.bindToCaHt === true) {
      formValues.chiffreAffaireTtc = _.round(event.target.value * 0.20, 2);
    }

    if (event.target.name === 'fraisHt' && this.state.formValues.bindToFraisHt === true) {
      formValues.fraisTtc = _.round(event.target.value * 0.20, 2);
    }

    this.setState({formValues:formValues});

    // si nous avons un callback pour écouter les changement de valeurs de notre formulaire
    if (this.props.hasOwnProperty("onFormChange")) {
      this.props.onFormChange(formValues);
    }
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
            <input type="text" name="chiffreAffaireHt" value={this.state.formValues.chiffreAffaireHt} id="chiffre-affaire-ht"/>
            <div className="simulator-form__field__description">
              Votre chiffre d'affaires sans la TVA de vos ventes. C'est une base de calcul pour certaines des charges.
            </div>
          </div>

          {/*Chiffre d'affaire TTC */}
          <div className="large-3 small-12 columns">
            <label htmlFor="chiffre-affaire-ttc">Chiffre d'affaires TTC</label>
            <input value={this.state.formValues.chiffreAffaireTtc} name="chiffreAffaireTtc" type="text" id="chiffre-affair‡e-ttc" />
            <div className="simulator-form__field__description">
              <input name="bindToCaHt" defaultChecked={this.state.formValues.bindToCaHt} type="checkbox" /> <em>automatiquement à 20% du HT</em> <br />
              Le total des ventes de la société en incluant la TVA.
            </div>
          </div>

          {/*frais HT */}
          <div className="large-3 small-12 columns">
            <label htmlFor="frais-ht"> Frais HT </label>
            <input value={this.state.formValues.fraisHt} name="fraisHt"  type="text" id="frais-ht" />
            <div className="simulator-form__field__description">
              Vos dépenses de sociétés <strong>hors taxe</strong> : expertise comtpable, achats, fournisseurs etc ...
            </div>
          </div>

          {/*frais TTC*/}
          <div className="large-3 small-12 columns">
            <label htmlFor="frais-ttc"> Frais TTC </label>
            <input value={this.state.formValues.fraisTtc} name="fraisTtc" type="text" id="frais-ttc" className="form-control" />
            <div className="simulator-form__field__description">
              <input name="bindToFraisHt" defaultChecked={this.state.formValues.bindToFraisHt} type="checkbox" />
              <em>automatiquement à 20% du HT</em> <br />
              <div className="">
                Vos dépenses de sociétés avec la TVA : expertise comptable, achats, fournisseurs etc ...
              </div>
            </div>
          </div>


          {/*CFE */}
          <div className="large-3 small-12 columns">
            <label htmlFor="cfe"> CFE à verser </label>
            <input value={this.state.formValues.cfe} name="cfe" type="text" id="cfe"/>
            <div className="simulator-form__field__description">
              Vous devez verser une cotisation foncière des entreprises, dont le montant dépend de votre commune.
            </div>
          </div>

          {/*Rémunération */}
          <div className="large-3 small-12 columns">
            <label htmlFor="remuneration"> Rémunération </label>
            <input value={this.state.formValues.remuneration}  name="remuneration" id="remuneration" type="text" />
            <div className="simulator-form__field__description">
              Votre rémunération en tant que gérant. Les cotisations sociales sont calculées sur cette base.
            </div>
          </div>

          <div className="large-3 small-12 columns end">
            <label> Prévoyance </label>
            <select name="prevoyance" value={this.state.formValues.prevoyance} id="prevoyance" type="text">
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
