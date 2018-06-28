<template lang="pug">
  .instructions
    h5 {{ instruction }}
    h5.notes(v-if="!showAddBox") Notes: {{ notes }}

    textarea.instructionBox(v-if="showAddBox"  v-model="newInstructionVal" placeholder="enter instructions...") 
    textarea.notesBox(v-if="showAddBox" v-model="newNotesVal" placeholder="notes...")
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
      newInstructionVal: '',
      newNotesVal: ''
    }
  },
  beforeCreate: function () {
  },
  mounted: function () {
    log('Mounted')
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


  @media #{$tablet} {
    width: 260px;
  }
  @media #{$mobile} {
    width: 240px;
  }
}
</style>
