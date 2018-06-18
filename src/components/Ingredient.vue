<template lang="pug">
  .ingredient
    .row.justify-content-start(v-if="!showAddBox")
      .col-1
        button.add(@click="addToList") +
      .col-1
        h6.amount(v-if="amount.whole && mesSystem === 'imperial'") {{ amount.whole }}
          span.fraction(v-if="amount.fraction") {{ amount.fraction }}
        h6.amount(v-if="amount.fraction && !amount.whole && mesSystem === 'imperial'") {{ amount.fraction }}
        .metric(v-if="mesSystem === 'metric'")
          h6.amount(v-if="amount.whole") {{ convertToMetric(amount.whole, amount.fraction)[0] }}
            span.fraction(v-if="amount.fraction") {{ convertToMetric(amount.whole, amount.fraction)[1] }}
          h6.amount(v-if="amount.fraction && !amount.whole") {{ convertToMetric(amount.whole, amount.fraction)[1] }}
      .col-2
        button.measurement(v-if="mesSystem === 'imperial'" @click="measurementChanged(amount.whole, amount.fraction, item.measurement)") {{ item.measurement }}
        h6.measurement(v-if="mesSystem === 'metric'") {{ convertToMetric(amount.whole, amount.fraction)[2] }}
      .col-5 
        h6.name {{ item.name }}
    // Empty :
    .row.justify-content-start(v-if="showAddBox")
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
          option cup
          option tsp
          option tbsp
          option lbs
          option oz
          option stick
          option g
          option kg
          option ml
          option L
      .col-3
        input.amount-empty.name(v-model="newNameVal")
</template>

<script>
import _ from 'lodash'
import { mapActions } from 'vuex'
import debug from 'debug'
let log = debug('component:RecipeBoxIngredient')
export default {
  name: 'recipeBoxIngredient',
  props: [
    'item',
    'showAddBox',
    'index',
    'recipe',
    'mesSystem',
    'convertFrac'
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
    log('Mounted', this.mesSystem)
  },
  computed: {
    amount () {
      return this.convertNumber(this.item.amount)
    }
  },
  methods: {
    ...mapActions('recipes', [
      'editMeasurement'
    ]),
    addToList () {

    },
    convertNumber (amount) {
      let number = parseFloat(amount)
      let fraction = (number % 1)
      let whole = (number - fraction)
      if (whole <= 0.251 && whole >= 0) {
        whole = null
      }
      if (fraction < 0.25 && Math.round(fraction) === 0) {
        fraction === null
        console.log('fractions is: ', fraction)
      } else {
        if (fraction < 0.251 && fraction > 0) {
          fraction = '1/4'
        } else if (fraction <= 0.331 && fraction > 0.25) {
          fraction = '1/3'
        } else if (fraction <= 0.51 && fraction > 0.331) {
          fraction = '1/2'
        } else if (fraction <= 0.661 && fraction > 0.5) {
          fraction = '2/3'
        } else if (fraction <= 0.751 && fraction > 0.661) {
          fraction = '3/4'
        } else if (fraction === 0.99) {
          whole += 1
          fraction = 0
        }
      }
      // const returnVal = `${whole} ${fraction}`
      return {whole, fraction}
    },
    measurementChanged (whole, fraction, measurement) {
      const { id } = this.recipe
      console.log('Found it', id, ' index: ', this.index)
      let mes = this.recipe.ingredients[this.index].measurement

      const recipe = _.cloneDeep(this.recipe)

      if (this.recipe.ingredients[this.index].name.includes('butter')) {
        if (mes === 'stick') {
          recipe.ingredients[this.index].measurement = 'cup'
          recipe.ingredients[this.index].amount /= 2
        } else if (mes === 'cup') {
          recipe.ingredients[this.index].measurement = 'stick'
          recipe.ingredients[this.index].amount *= 2
        }
      } else {
        if (mes === 'tbsp') {
          recipe.ingredients[this.index].measurement = 'tsp'
          recipe.ingredients[this.index].amount *= 3
        } else if (mes === 'cup' || mes === 'cups') {
          recipe.ingredients[this.index].measurement = 'oz'
          recipe.ingredients[this.index].amount *= 8
        } else if (mes === 'oz') {
          recipe.ingredients[this.index].measurement = 'cup'
          recipe.ingredients[this.index].amount /= 8
        } else if (mes === 'tsp') {
          if (recipe.ingredients[this.index].amount % 3 === 0) {
            recipe.ingredients[this.index].measurement = 'tbsp'
            recipe.ingredients[this.index].amount /= 3
          }
        }
      }
      this.editMeasurement(recipe)
    },
    convertToMetric (whole, frac) {
      let mes = this.recipe.ingredients[this.index].measurement
      console.log(this.recipe.ingredients[this.index].name, whole, frac)
      if (whole === null) { whole = 0 }
      if (mes === 'cup' || mes === 'stick') {
        whole = Math.round((parseFloat(whole) + this.convertFrac(frac)) * 227)
        frac = null
        mes = 'g'
      }
      if (mes === 'lbs') {
        whole = Math.round((parseFloat(whole) + this.convertFrac(frac)) * 453.6)
        frac = null
        mes = 'g'
      }
      console.log('this is it: ', whole, frac, mes)
      return [whole, frac, mes]
    }
    // convertToImperial (whole, frac) {
    //   let mes = this.recipe.ingredients[this.index].measurement
    //   const temp = parseFloat(whole) / 450
    //   if (mes === 'g') {
    //     mes = 'lbs'
    //     if (temp >= 0.75 && temp <= 1.3) {
    //       whole = '1'
    //     } else if (temp >= 1.75 && temp <= 2.3) {
    //       whole = '2'
    //     } else if (temp >= 2.75 && temp <= 3.3) {
    //       whole = '3'
    //     }
    //   }
    //   return [whole, mes]
    // }
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
    &.measurement { margin-left: 10px; width: 40px; }
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
    &.measurement { margin-left: 10px; width: 45px; height: 25px;padding-left: 10px;}
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
