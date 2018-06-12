<template lang="pug">
  .instructions
    h5(v-for="item in instruction" :key="instruction.data") {{ item }}
    h5.notes Notes: {{ notes }}
</template>

<script>
import debug from 'debug'
let log = debug('component:RecipeBoxInstructions')
export default {
  name: 'recipeBoxInstructions',
  props: [
    'instruction',
    'notes'
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
  @media #{$tablet} {
    width: 260px;
  }
  @media #{$mobile} {
    width: 240px;
  }
}
</style>
