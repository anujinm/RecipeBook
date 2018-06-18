<template lang="pug">
  .ingredients
    button(v-if="showAddBox" @click="addIngredient = !addIngredient") +
    ingredient-row(v-if="showAddBox" v-for="(item, index) in 5" ref="newIngredientVals" 
      :key="item + index" :index="index" :showAddBox="showAddBox"
      :recipe="data")
    ingredient-row(v-if="showAddBox && addIngredient" v-for="(item, index) in 5" ref="newIngredientVals" 
      :key="item.line" :showAddBox="showAddBox" :recipe="data")

    ingredient-row(v-for="(ingredient, index) in ingredients" :key="ingredient.data"
     :item="ingredient" :recipe="recipe" :index="index" :mesSystem="mesSystem" :convertFrac="convertFrac")
</template>

<script>
import Ingredient from '@/components/Ingredient'
import debug from 'debug'
let log = debug('component:RecipeBoxIngredients')
export default {
  name: 'recipeBoxIngredients',
  props: [
    'recipe',
    'ingredients',
    'showAddBox',
    'mesSystem',
    'convertFrac'
  ],
  data () {
    return {
      addIngredient: false,
      showNextAdd: false,
      index: this.newIngredientVals
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
    'ingredient-row': Ingredient
  }
}
</script>

<style scoped lang="scss">
@import "../styles/_variables";
@import "../styles/_mixins";
.ingredients {
  width: 280px;
  // height: 150px;
  // border: 1px solid $gray60;
  // position: relative;
  // overflow: scroll;
  
  .ingredient {
    // margin: 5px;
  }
  button {
    outline: none;
    width: 25px;
    height: 25px;
    font-size: 15px;
    border-radius: 5px;
    cursor: pointer;
  }

  @media #{$tablet} {
    width: 260px;
  }
  @media #{$mobile} {
    width: 260px;
  }
}
</style>
