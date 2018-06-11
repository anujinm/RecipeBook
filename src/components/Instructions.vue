<template lang="pug">
  .instructions
    h5 Mix: Flour + sugar + baking powder + salt
    h5 Add: butter + vanilla + eggs + milk
    h5 Oven: 350 degrees Flour
    h5 Cok: 20 minutes
    h5.notes Notes: Can add chocolate chips
   
</template>

<script>
import debug from 'debug'
let log = debug('component:RecipeBoxInstructions')
export default {
  name: 'recipeBoxInstructions',
  props: [],
  data () {
    return {
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
  @media #{$tablet} {
    width: 260px;
  }
  @media #{$mobile} {
    width: 260px;
  }
}
</style>
