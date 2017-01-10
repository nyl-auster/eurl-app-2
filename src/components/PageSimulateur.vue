<template>
  <div class="hello">
    <simulateur-form></simulateur-form>
    Je suis la page du simulateur
  </div>
</template>

<script>
import SimulateurForm from './simulateur/simulateurForm'
export default {
  name: 'page-simulateur',
  components: {
    SimulateurForm
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
