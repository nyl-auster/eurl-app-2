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
  <span class="yineo-tooltip">
    <!--<span class="trigger-modal" @click="this.$emit('pushTooltip')"> ? </span>-->
    <!--<span title="cliquer pour avoir de l'aide" class="trigger-modal" @click="show=!show"> ? </span>-->
    <span title="cliquer pour avoir de l'aide" class="trigger-modal" @click="show=!show"> ? </span>

    <div class="modal" v-show="show">
      <div class="row">

        <div class="small-12 medium-12 columns">
          {{message}}
        </div>


        <div class="small-12 columns">
          <span @click="show=false" class="small button">OK</span>
        </div>

      </div>
    </div>
  </span>
</template>

<style scoped>

  .yineo-tooltip {
    position:relative;
    cursor:pointer;
  }

  .trigger-modal {
    font-size:0.9rem;
    border:solid #777 1px;
    /*border:solid #1779ba 1px;*/
    /*color :#1779ba;*/
    border-radius:10rem;
    display:inline-block;
    text-align:center;
    width:1.7rem;
    height:1.7rem;

  }

  .button {
    margin-top:1rem;
    border:solid white 1px;
  }

  .modal {
    font-size:1.1rem;
    text-align:center;
    position:absolute;
    opacity:0.95;
    left:0;
    top:0;
    width:100%;
    padding:1rem;
    overflow:auto;
    position: fixed;
    background:#1779ba;
    color:white;
  }

</style>
