<template lang="pug">
  .ingredient
    .row.justify-content-start
      .col-1
        button.add +
      .col-1
        h6.amount 2
      .col-2
        button.measurement cups
      .col-5 
        h6.name flour
</template>

<script>
import debug from 'debug'
let log = debug('component:RecipeBoxIngredient')
export default {
  name: 'recipeBoxIngredient',
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
.ingredient {
  width: 270px;

  button {
    background: transparent;
    height: 25px;
    font-size: 15px;
    border-radius: 5px;
    outline: none;
    cursor: pointer;
    &.add {
      width: 25px;
    }
    &.measurement { margin-left: 5px; }
  }
  h6 {
    font-size: 15px;
    font-weight: 400;
    margin-top: 10px;
    border: 1px solid $gray70; 
    border-radius: 5px;
    height: 24px;
    padding-top: 3px;
    &.amount{width: 30px; text-align: center;}
    &.name {width: 100px; margin-left: 10px; padding-left: 5px;}
  }

  @media #{$tablet} {
    
  }
  @media #{$mobile} {
  
  }
}
</style>
