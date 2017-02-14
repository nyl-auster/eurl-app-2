<script>
  export default {
    data:function() {
      return {
        showWarning:true
      }
    }
  }
</script>

<template>
  <div v-show="showWarning" class="row">
    <div class="small-12 columns">
      <div class="callout warning">
        Je ne suis pas expert comptable, les montants obtenus ne sont que des indicateurs en fonction des informations que j'ai pu réunir.
        <button @click="showWarning = !showWarning" class="close-button" aria-label="Close alert" type="button">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
  </div>
</template>

