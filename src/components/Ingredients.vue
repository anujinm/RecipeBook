<template lang="pug">
  .ingredients
    ingredient-row(v-if="showAddBox")
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
    'showAddBox'

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


  @media #{$tablet} {
    width: 260px;
  }
  @media #{$mobile} {
    width: 260px;
  }
}
</style>
