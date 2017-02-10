export default {
  props:['Results', 'params'],
  computed: {
    resultClasses: function() {
      return {
        alert:this.Results.getLine('resteEnBanque').montant < 0,
        success:this.Results.getLine('resteEnBanque').montant > 0
      }
    },
    chartData:function(){
      return {
        labels: [
          "Cotisations sociales",
          "Salaire"
          //"Yellow"
        ],
        datasets: [
          {
            data: [
              this.Results.getLine('totalCotisationsSociales').montant,
              this.params.remuneration
            ]
            //100]
            ,
            backgroundColor: [
              "#FF6384",
              "#36A2EB"
              //"#FFCE56"
            ],
            hoverBackgroundColor: [
              "#FF6384",
              "#36A2EB"
              // "#FFCE56"
            ]
          }]
      }
    }
  }
}

