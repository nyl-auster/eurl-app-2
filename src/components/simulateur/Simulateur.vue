<script>
  import SimulateurForm from "./simulateurForm"
  export default {
    methods: {
      // le formulaire nous transmet toutes ses valeurs quand elles changent
      onFormValuesUpdated:function(formValues) {

      }
    },
    watch: {
    },
    components:{SimulateurForm}
  }
</script>

<template>
  <div id="simulateur">
    <hr/>
    <simulateur-form @formValuesUpdated="onFormValuesUpdated"></simulateur-form>
  </div>
</template>

<style>

</style>

