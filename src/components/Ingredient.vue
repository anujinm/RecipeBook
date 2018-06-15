<template lang="pug">
  .ingredient
    .row.justify-content-start(v-if="!showAddBox")
      .col-1
        button.add +
      .col-1
        h6.amount(v-if="amount.whole") {{ amount.whole }}
          span.fraction(v-if="amount.fraction") {{ amount.fraction }}
        h6.amount(v-if="amount.fraction && !amount.whole") {{ amount.fraction }}
      .col-2
        button.measurement {{ item.measurement }}
      .col-5 
        h6.name {{ item.name }}
    .row.justify-content-start(v-if="showAddBox" @change="print")
      .col-1
        input.amount-empty.amount-whole(v-model="newAmountWholeVal" type="number" min="0" placeholder="0")
      .col-2 
        select.amount-empty.amount-fraction(v-model="newAmountFracVal")
          option 0
          option 1/2
          option 1/3
          option 1/4
          option 2/3
          option 3/4
      .col-2
        select.amount-empty.measurement(v-model="newMeasurementVal")
          option -
          option cups
          option tsp.
          option tbsp.
          option lbs
          option oz
          option g
          option kg
          option ml
          option L
      .col-3
        input.amount-empty.name(v-model="newNameVal")
</template>

<script>
import debug from 'debug'
let log = debug('component:RecipeBoxIngredient')
export default {
  name: 'recipeBoxIngredient',
  props: [
    'item',
    'showAddBox',
    'index'
  ],
  data () {
    return {
      newAmountWholeVal: '',
      newAmountFracVal: '',
      newMeasurementVal: '',
      newNameVal: ''
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
    print (event) {
      console.log(this.newAmountWholeVal)
      console.log(this.newAmountFracVal)
      console.log(this.newMeasurementVal)
      console.log(this.newNameVal, this.index)
    },
    convertNumber (amount) {
      let number = parseFloat(amount)
      let fraction = number % 1
      let whole = number - fraction
      if (fraction === 0.25) {
        fraction = '1/4'
      } else if (fraction === 0.33) {
        fraction = '1/3'
      } else if (fraction === 0.5) {
        fraction = '1/2'
      } else if (fraction <= 0.68) {
        fraction = '2/3'
      } else if (fraction === 0.75) {
        fraction = '3/4'
      }
      if (whole === 0) {
        whole = null
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
    font-size: 0.6em;
    vertical-align: super;
  }
  button {
    cursor: pointer;
    background: transparent;
    height: 25px;
    font-size: 15px;
    border-radius: 5px;
    outline: none;
    &.add {
      width: 25px;
    }
    &.measurement { margin-left: 10px; }
  }
  h6 {
    white-space: normal;
    font-size: 15px;
    font-weight: 400;
    margin-top: 12px;
    border: 1px solid $gray70; 
    border-radius: 5px;
    // height: 25px;
    padding-top: 4px;
    &.amount{width: 35px; height: 25px; text-align: center;}
    &.name {width: 135px; height: 70%; margin-left: 10px;
     padding-left: 5px;} 
  }

  .amount-empty {
    white-space: normal;
    font-size: 15px;
    font-weight: 400;
    margin-top: 12px;
    border: 1px solid $gray70; 
    border-radius: 5px;
    height: 30px;
    width: 28px;
    outline: none;
    &.amount-whole {
      padding-left: 3px;
    }
    &.amount-fraction {
      width: 45px;
    }
    &.measurement {
      width: 55px;
    }
    &.name {
      width: 110px;
      margin-left: 10px;
    }
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
