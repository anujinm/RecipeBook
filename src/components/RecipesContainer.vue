<template lang="pug">
  .recipes
    ul  
      li(v-for="(recipe, index) in recipes" :key="'recipe'+index") {{ recipe.title }}
    // .outerbox
    // .insidebox
    .recipeBox
      // recipe-box(v-for="recipe in recipes" :key="recipe" :recipes="recipes")
      // carousel(:navigation-enabled="true" :per-page="3" :per-page-custom="[[360,1],[768,2],[1400,3]]")
      //   slide
      //     recipe-box
      //   slide  
      //     recipe-box
      //   slide
      //     recipe-box
      //   slide
      //     recipe-box
      //   slide
      //     recipe-box
      //   slide
      //     recipe-box
      //   slide
      //     recipe-box
      //   slide
      //     recipe-box
      //   slide
      //     recipe-box
      //   slide
      //     recipe-box
      //   slide
      //     recipe-box
      //   slide
      //     recipe-box
      //   slide
      //     recipe-box
      //   slide
      //     recipe-box
      //   slide
      //     recipe-box 
</template>

<script>
import { mapGetters } from 'vuex'
import debug from 'debug'
import RecipeBox from '@/components/RecipeBox'
import { Carousel, Slide } from 'vue-carousel'
let log = debug('component:RecipesContainer')
export default {
  name: 'recipesContainer',
  props: [],
  data () {
    return {
    }
  },
  beforeCreate: function () {
  },
  mounted: function () {
    log('Mounted')
    log(this.state)
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
.VueCarousel{
  margin-top: 20px;
}

.recipes {
  overflow-x: hidden;
  overflow-y: hidden;
  white-space: nowrap;
  height: 600px;
  width: 1300px;
  margin-left: 280px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .recipeBox {
    width: 1200px;
    display: inline-block;
    position: relative;
  }
  .outerbox {
    border: none;
    background-image: linear-gradient(to right bottom, transparent,#A37E44, #598043);
    // border-color: linear-gradient(to right bottom, white, #A37E44, #598043);
    width: 1400px;
    height: 600px;
    border-radius: 18px;
    z-index: 0;
    position: absolute;
    left: 7.4%;
    box-shadow: 5px 5px 6px $gray30;
  }
  .insidebox {
    position: absolute;
    left: 7.5%;
    width: 1395px;
    height: 595px;
    border-radius: 18px;
    background: linear-gradient($white, #DEE1E2);
    z-index: 0;
  }
  @media #{$tablet} {
    width: 650px;
    margin-left: 80px;
    .recipeBox{
      width: 605px;
    }
    .outerbox {
      width: 700px;
    }
    .insidebox{
      width: 697px;
    }
  }
  @media #{$mobile} {
    width: 300px;
    margin-left: 30px;
    overflow-y: hidden;
    overflow-x: scroll;
    white-space: normal;
    .recipeBox {
      margin-top: 60px;
      width: 300px;
    }
    .outerbox {
      width: 320px;
      height: 600px;
      // margin-bottom: 40px;
    }
    .insidebox{
      left: 33px;
      height: 597px;
      width: 315px;
      // margin-bottom: 40px;
    }
  }
}
</style>
