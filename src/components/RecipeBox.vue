<template lang="pug">
  .box
    title-box.title(v-if="showAddBox" ref="titleInput" :showAddBox="showAddBox")
    title-box.title(v-if="!showAddBox" :data="data" :image="data.image" :isFav="data.fav")
    .main
      ingredients-box.ingredients.empty(v-if="showAddBox" ref="ingredientInput" :showAddBox="showAddBox") 
      ingredients-box.ingredients(v-if="!showAddBox" :ingredients="data.ingredients" :recipe="data")
      hr
      instructions-box.instructions.empty(v-if="showAddBox"  ref="instructionsInput" :showAddBox="showAddBox")
      instructions-box.instructions(v-if="!showAddBox" :instruction="data.instructions.instruction" :notes="data.instructions.notes" :recipe="data")
      button(v-if="showAddBox" @click="addData") Add
</template>

<script>
import { mapActions } from 'vuex'
import debug from 'debug'
import Title from '@/components/Title'
import Ingredients from '@/components/Ingredients'
import Instructions from '@/components/Instructions'
let log = debug('component:RecipeBox')
export default {
  name: 'recipeBox',
  props: [
    'data',
    'showAddBox'
  ],
  data () {
    return {
      // title: 'Title'
    }
  },
  beforeCreate: function () {
  },
  mounted: function () {
    log('Mounted')
  },
  computed: {
    // ...mapGetters('recipes', [
    //   'recipes'
    // ])
    title () {
      return this.$refs.titleInput.newTitleVal
    },
    instruction () {
      return this.$refs.instructionsInput.newInstructionVal
    },
    notes () {
      return this.$refs.instructionsInput.newNotesVal
    },
    ingredientName () {
      let item = 0
      for (item; item < (this.$refs.ingredientInput.$refs.newIngredientVals.length); item++) {
        return this.$refs.ingredientInput.$refs.newIngredientVals[item].newNameVal
      }
    }
  },
  methods: {
    ...mapActions('recipes', [
      'addRecipe'
    ]),
    addData () {
      console.log('here!! ', this.$refs.ingredientInput.$refs.newIngredientVals)
      console.log(this.retrunVal)
      const { newIngredientVals } = this.$refs.ingredientInput.$refs

      console.log(newIngredientVals)

      let myRecipe = {
        title: this.title,
        image: require('../../food2.png'),
        fav: false,
        ingredients: [],
        instructions: {
          instruction: [
            this.instruction],
          notes: this.notes
        }
      }
      if (Array.isArray(newIngredientVals)) {
        newIngredientVals.forEach((ingredient) => {
          console.log('ingredient is:', ingredient)
          if (ingredient.newNameVal !== '' && ingredient.newAmountFracVal !== '' && ingredient.newAmountWholeVal !== '' && ingredient.newMeasurementVal !== '') {
            const { newNameVal, newAmountFracVal, newAmountWholeVal, newMeasurementVal } = ingredient
            let newFracVal = this.convertAmount(newAmountFracVal)
            const newAmountVal = String(parseFloat(newAmountWholeVal) + parseFloat(newFracVal))
            myRecipe.ingredients.push({ name: newNameVal, amount: newAmountVal, measurement: newMeasurementVal })
          }
        })
      } else {
        const { newNameVal, newAmountFracVal, newAmountWholeVal, newMeasurementVal } = newIngredientVals
        let newFracVal = this.convertAmount(newAmountFracVal)
        const newAmountVal = String(parseFloat(newAmountWholeVal) + parseFloat(newFracVal))
        myRecipe.ingredients.push({ name: newNameVal, amount: newAmountVal, measurement: newMeasurementVal })
      }
      this.addRecipe(myRecipe)
    },
    convertAmount (newFracVal) {
      if (newFracVal === '0') {
        newFracVal = 0
      } else if (newFracVal === '1/4') {
        newFracVal = 0.25
      } else if (newFracVal === '1/3') {
        newFracVal = 0.33
      } else if (newFracVal === '1/2') {
        newFracVal = 0.5
      } else if (newFracVal === '2/3') {
        newFracVal = 0.66
      } else if (newFracVal === '3/4') {
        newFracVal = 0.75
      }
      return newFracVal
    }
  },
  components: {
    'title-box': Title,
    'ingredients-box': Ingredients,
    'instructions-box': Instructions
  }
}
</script>

<style scoped lang="scss">
@import "../styles/_variables";
@import "../styles/_mixins";
.box {
  width: 300px;
  height: 500px;
  // border: 1px solid $gray80;
  background: $white;
  box-shadow:  3px 4px 10px 3px $gray60;
  position: relative;
  display: inline-block;
  z-index: 1;
  border-radius: 20px;
  margin:10px;

  .main {
    border: 1px solid $gray60;
    position: relative;
    overflow-y: scroll;
    overflow-x: hidden;
    height: 380px;
    width: 280px;
    margin: 10px;
  }
  .ingredients {
    padding-left: 10px;
  }
  .instructions {
    padding-top: 0;
  }

  button {
    outline: none;
    cursor: pointer;
    position: relative;
    bottom: 0;
    left: 70%;
    width: 60px;
    border-radius: 5px;
    font-size: 15px;
    margin-bottom: 10px;
    background: linear-gradient(#A4CF74, #4F8A27);
    box-shadow: 2px 2px 6px rgb(30, 53, 16);
  }

  hr {margin: 8px;}
  @media #{$tablet} {
    width: 280px;
    .main {width: 260px;}
  }
  @media #{$mobile} {
    width: 260px;
    .main {width: 240px;}
  }
}
</style>
