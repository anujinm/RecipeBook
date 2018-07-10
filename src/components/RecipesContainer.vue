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
          carousel(v-if="!showAddBox" paginationColor="#595959" paginationActiveColor="#282828" :navigation-enabled="true" :per-page="3" :per-page-custom="[[360,1],[800,2],[1400,3]]")
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
    margin-left: 0px;
  }
  .outerbox {
    border: none;
    background-image: radial-gradient(rgb(189, 186, 182),transparent);
    opacity: .7;
    width: 1400px;
    height: 640px;
    border-radius: 18px;
    z-index: 0;
    position: absolute;
    box-shadow: inset 0px 0px 3px 3px $gray30;
  }
  .insidebox {
    margin-top: 2px;
    position: absolute;
    width: 1395px;
    height: 635px;
    border-radius: 18px;
    // background: linear-gradient(to bottom left, $white ,rgb(232, 235, 236),$white, rgb(232, 235, 236), $white);
    background: transparent;
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
    width: 400px;
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

  .VueCarousel-slide.VueCarousel-slide-active {
    max-width: 400px;
    margin-left: 45px;
  }
  // not so sure if this navigation-button even working ....
  
  // .VueCarousel-navigation { 
  //   // button {
  //   //   color: $gray20;
  //   //   margin-right: 0px;
  //   // }
  // }
  @media #{$tablet} {
    .VueCarousel-slide.VueCarousel-slide-active {
      margin-left: 0;
    }
  }
  @media #{$mobile} {
    .VueCarousel-wrapper {
      max-width: 280px;
    }
    .VueCarousel-navigation { 
      button {
        margin-right: 50px;
      }
    }
    .VueCarousel-slide.VueCarousel-slide-active {
      max-width: 310px;
    }
  }
}
</style>
