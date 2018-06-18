<template lang="pug">
  .recipes  
    .outerbox
    .insidebox
    .recipeBox
      .row.justify-content-center
        recipe-box(v-if="showAddBox " :showAddBox="showAddBox")
      carousel(v-if="!showAddBox" :navigation-enabled="true" :per-page="3" :per-page-custom="[[360,1],[800,2],[1400,3]]")
        slide(v-for="(recipe, index) in recipes" :key="'recipe' + index")
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
    'mesSystem'
  ],
  data () {
    return {
    }
  },
  beforeCreate: function () {
  },
  mounted: function () {
    log('Mounted')
    // log(this.showAddBox)
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
  // overflow-x: hidden;
  // overflow-y: hidden;
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
    margin-top: 20px;
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
    margin-left: 100px;
    .recipeBox{
      width: 605px;
      // overflow: hidden;
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
    margin-left: 40px;
    // overflow-y: hidden;
    // overflow-x: scroll;
    // white-space: normal;
    .recipeBox {
      margin-top: 0px;
      width: 330px;
      // overflow: hidden;
      margin-left: 7px;
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
<style lang="scss">
@import "../styles/_variables";
.VueCarousel{
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
