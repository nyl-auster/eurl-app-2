<script>
export default {
  props:['Results'],
  computed:{
    resultClasses: function() {
      return {
        alert:this.Results.getLine('resteEnBanque').montant < 0,
        success:this.Results.getLine('resteEnBanque').montant > 0
      }
    }
  }
}
</script>

<template>
  <div class="row big-picture">
    <div class="small-12 medium-6 columns">
      <h2> Dettes EURL <span class="subheader"></span></h2>
      <p>
        <span class="result">{{Results.getLine('total').montant}}</span>
      </p>
    </div>
    <div class="small-12 medium-6 columns">
      <h2>Solde prévisionnel</h2>
      <p>
        <span :class="resultClasses" class="result">{{Results.getLine('resteEnBanque').montant}}</span>
      </p>
    </div>
  </div>
</template>

<style scoped>
  .big-picture {
    border-top:1px solid silver;
    border-bottom:1px solid silver;
    margin:2rem;
    text-align:center;
    padding:1rem;
    padding-top:1.2rem;
  }

  .big-picture h2 {
    text-transform:uppercase;
    font-weight:bold
  }

  .big-picture .result {
    font-weight:bold;
    font-size:2rem;
  }

  .result {
    color:inherit;
  }

  .result.success {
    color:green;
    transition:all 1s;
  }

  .result.alert {
    color:red;
    transition:all 1s;
  }
</style>
