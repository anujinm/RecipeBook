<template lang="pug">
  .instructions
    h5(v-for="item in instruction" :key="instruction.data") {{ item }}
    h5.notes(v-if="!showAddBox") Notes: {{ notes }}

    textarea.instructionBox(v-if="showAddBox" placeholder="enter instructions...") 
    textarea.notesBox(v-if="showAddBox" placeholder="notes...")

    button Add
</template>

<script>
import debug from 'debug'
let log = debug('component:RecipeBoxInstructions')
export default {
  name: 'recipeBoxInstructions',
  props: [
    'instruction',
    'notes',
    'showAddBox'
  ],
  data () {
    return {
    }
  },
  beforeCreate: function () {
  },
  mounted: function () {
    log('Mounted')
    log(this.instruction)
    log(this.notes)
  },
  computed: {
  },
  methods: {
  },
  components: {
  }
}
</script>

<style scoped lang="scss">
@import "../styles/_variables";
@import "../styles/_mixins";
.instructions {
  width: 260px;
  // border: 1px solid $gray60;
  // position: relative;
  // overflow: scroll;
  font-size: 15px;
  padding: 10px;
  white-space: normal;
  h5 {
    padding:10px;
    font-weight: 400;
  }
  .notes {
    color: green;
  }
  .instructionBox {
    height: 150px;
    width: 250px;
  }
  .notesBox {
    height: 30px;
    width: 250px;
  }
  button {
    position: absolute;
    bottom: 2%;
    right: 8%;
    width: 60px;
    border-radius: 5px;
    background: linear-gradient(#A4CF74, #4F8A27);
    box-shadow: 2px 2px 6px rgb(30, 53, 16);
  }

  @media #{$tablet} {
    width: 260px;
  }
  @media #{$mobile} {
    width: 240px;
  }
}
</style>
