<script>
export default {
  props: ['message'],
  data() {
    return {
      show: false
    }
  }
}
</script>

<template>

  <span class="yineo-tooltip" @mouseover="show=true" @mouseleave="show=false">
    <span title="cliquer pour avoir de l'aide" class="trigger-modal"> ? </span>

    <transition name="fade">
    <div class="modal" v-if="show">
      <div class="row">

        <div class="small-12 medium-12 columns">
          {{message}}
        </div>

        <div class="small-12 columns show-for-small-only">
          <span @click="show=false" class="small button">OK</span>
        </div>

      </div>
    </div>
    </transition>
  </span>

</template>

<style scoped>

  .yineo-tooltip {
    position:relative;
    cursor:pointer;
  }

  .trigger-modal {
    border:solid #1779ba 1px;
    color:#1779ba;
    border-radius:10rem;
    display:inline-block;
    text-align:center;
    font-size:1.2rem;
    width:2.0rem;
    height:2.0rem;
    z-index:1;

  }

  .button {
    margin-top:1rem;
    border:solid white 1px;
  }

  .modal {
    position:absolute;
    border-radius:5px;
    top:40px;
    right:0;
    opacity:1;
    width:270px;
    padding:1rem;
    overflow:auto;
    background:#1779ba;
    color:white;
    z-index:2;
  }

.fade-enter-active, .fade-leave-active {
  /*transition: opacity .3s*/
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0
}

</style>
