<template lang="pug">
  .ingredient
    .row.justify-content-start
      .col-1
        button.add +
      .col-1
        h6.amount {{ amount.whole }}
          span.fraction(v-if="amount.fraction") {{ amount.fraction }}
      .col-2
        button.measurement {{ item.measurement }}
      .col-5 
        h6.name {{ item.name }}
</template>

<script>
import debug from 'debug'
let log = debug('component:RecipeBoxIngredient')
export default {
  name: 'recipeBoxIngredient',
  props: [
    'item'
  ],
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
    amount () {
      return this.convertNumber(this.item.amount)
    }
  },
  methods: {
    convertNumber (amount) {
      let number = parseFloat(amount)
      let fraction = number % 1
      let whole = number - fraction
      if (fraction === 0.33) {
        fraction = '1/3'
      } else if (fraction === 0.66) {
        fraction = '2/3'
      } else if (fraction === 0.25) {
        fraction = '1/4'
      } else if (fraction === 0.5) {
        fraction = '1/2'
      } else if (fraction === 0.75) {
        fraction = '3/4'
      }
      // const returnVal = `${whole} ${fraction}`
      return {
        whole,
        fraction
      }
    }
  },
  components: {
  }
}
</script>

<style scoped lang="scss">
@import "../styles/_variables";
@import "../styles/_mixins";
.ingredient {
  width: 280px;

  // .my-text-container{
  //   font-size: 1vw;
  //   span {
  //     display: block;
  //     background-color: $black;
  //     width: 4em;
  //     height: 4em;
  //   }
  // }

  .fraction{
    font-size: 0.5em;
    vertical-align: super;
  }
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
    &.measurement { margin-left: 10px; }
  }
  h6 {
    white-space: normal;
    font-size: 15px;
    font-weight: 400;
    margin-top: 5px;
    border: 1px solid $gray70; 
    border-radius: 5px;
    // height: 25px;
    padding-top: 3px;
    &.amount{width: 35px; height: 25px; text-align: center;}
    &.name {width: 135px; height: 70%; margin-left: 10px;
     padding-left: 5px;} 
  }

  @media #{$tablet} {
    width: 260px;
    h6.name{
      width: 120px;
    }
  }
  @media #{$mobile} {
    width: 260px;
    h6.name{
      width: 100px;
    }
  }
}
</style>
