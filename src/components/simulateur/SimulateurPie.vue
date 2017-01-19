<script>
// camembert réactif bitch

import { Pie, mixins } from 'vue-chartjs'

export default Pie.extend({
  mixins: [mixins.reactiveProp],
  props: ["chartData"],
  mounted () {
    this.renderChart(this.chartData)
  }
});
</script>
