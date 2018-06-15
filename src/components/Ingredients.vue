<template lang="pug">
  .ingredients
    button(v-if="showAddBox" @click="addIngredient = !addIngredient") +
    ingredient-row(v-for="(item, index) in 5" ref="newIngredientVals" :key="item + index" v-if="showAddBox"  :index="index" :showAddBox="showAddBox" :recipe="recipe")
    ingredient-row(v-for="(item, index) in 5" ref="newIngredientVals" :key="item.line" v-if="showAddBox && addIngredient" :showAddBox="showAddBox" :recipe="recipe")

    ingredient-row(v-for="ingredient in ingredients" :key="ingredient.data" :item="ingredient")
</template>

<script>
import Ingredient from '@/components/Ingredient'
import debug from 'debug'
let log = debug('component:RecipeBoxIngredients')
export default {
  name: 'recipeBoxIngredients',
  props: [
    'ingredients',
    'showAddBox',
    'recipe'
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
