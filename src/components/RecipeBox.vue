<template lang="pug">
  .box
    
</template>

<script>
import debug from 'debug'
let log = debug('component:RecipeBox')
export default {
  name: 'recipeBox',
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
.box {
  width: 300px;
  height: 400px;
  border: 1px solid $gray80;
  background: gray;
  
  @media #{$tablet} {
    
  }
  @media #{$mobile} {
   
  }
}
</style>
