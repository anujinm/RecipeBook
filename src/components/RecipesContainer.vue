<template lang="pug">
  .recipes
    .row.justify-content-center  
      .outerbox
      .insidebox
    .row.justify-content-center
      .recipeBox
        .row.justify-content-center
          recipe-box(v-if="showAddBox " :showAddBox="showAddBox")
        .row.justify-content-center
          carousel(v-if="!showAddBox" :navigation-enabled="true" :per-page="3" :per-page-custom="[[360,1],[800,2],[1400,3]]")
            slide(v-for="(recipe, index) in recipes" :key="'recipe' + index" v-if="!FavClicked")
              recipe-box(:data="recipe" :mesSystem="mesSystem")
            slide(v-for="(recipe, index) in recipes" :key="'recipe' + index" v-if="FavClicked && recipe.fav == 'true'")
              recipe-box(:data="recipe" :mesSystem="mesSystem")
        
</template>

<script>
import { mapGetters } from 'vuex'
import debug from 'debug'
import RecipeBox from '@/components/RecipeBox'
import { Carousel, Slide } from 'vue-carousel'
let log = debug('component:RecipesContainer')
export default {
  name: 'recipesContainer',
  props: [
    'showAddBox',
    'mesSystem',
    'FavClicked'
  ],
  data () {
    return {
    }
  },
  beforeCreate: function () {
  },
  mounted: function () {
    log('Mounted')
    log(this.FavClicked)
  },
  computed: {
    ...mapGetters('recipes', [
      'recipes'
    ])
    // ...mapState({
    //   recipes: state => state.recipes
    // })
  },
  methods: {
  },
  components: {
    'recipe-box': RecipeBox,
    Carousel,
    Slide
  }
}
</script>

<style scoped lang="scss">
@import "../styles/_variables";
@import "../styles/_mixins";
.recipes {
  white-space: nowrap;
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .recipeBox {
    width: 1300px;
    display: inline-block;
    position: relative;
    margin-top: 30px;
    margin-left: 120px;
  }
  .outerbox {
    border: none;
    background-image: linear-gradient(to right bottom, transparent,#A37E44, #598043);
    width: 1400px;
    height: 650px;
    border-radius: 18px;
    z-index: 0;
    position: absolute;
    box-shadow: 5px 5px 6px $gray30;
  }
  .insidebox {
    margin-top: 2px;
    position: absolute;
    width: 1395px;
    height: 645px;
    border-radius: 18px;
    background: linear-gradient($white, #DEE1E2);
    z-index: 0;
  }
  @media #{$tablet} {
    width: 650px;
    .recipeBox{
      width: 605px;
      margin-left: 7px;
    }
    .outerbox {
      width: 700px;
    }
    .insidebox{
      width: 697px;
    }
  }
  @media #{$mobile} {
    width: 320px;
    .recipeBox {
      margin-top: 10px;
      width: 330px;
      margin-left: 30px;
    }
    .outerbox {
      width: 320px;
      height: 600px;
    }
    .insidebox{
      // left: 33px;
      height: 597px;
      width: 315px;
    }
  }
}
</style>
<style lang="scss">
@import "../styles/_variables";
.VueCarousel{
  width: 1300px;
  // not so sure if this navigation-button even working ....
  .VueCarousel-navigation-button {
    color: $gray20;
    margin-right: 70px;
  }
  @media #{$tablet} {
    .VueCarousel-navigation-button {
      margin-right: 0px;
    }
  }
  @media #{$mobile} {
    .VueCarousel-navigation-button {
      margin-left: 20px;
      margin-right: 60px;
    }
  }
}
</style>
