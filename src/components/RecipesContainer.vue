<template lang="pug">
  .recipes
    .outerbox
    .insidebox
    .recipeBox
        recipe-box
        recipe-box
        recipe-box

</template>

<script>
import debug from 'debug'
import RecipeBox from '@/components/RecipeBox'
let log = debug('component:RecipesContainer')
export default {
  name: 'recipesContainer',
  props: [],
  data () {
    return {
      recipes: [
        'recipe1',
        'recipe2',
        'recipe3'
      ]
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
    'recipe-box': RecipeBox
  }
}
</script>

<style scoped lang="scss">
@import "../styles/_variables";
@import "../styles/_mixins";
.recipes {
  overflow-y: scroll;
  // display: flex;
  // display: inline-block;
  height: 600px;
  &.recipeBox {
    // z-index: 90;
    // display: inline-block;
    // left: 10%;
    // top: 10%;
    position: relative;

  }
  .outerbox {
    border: none;
    background-image: linear-gradient(to right bottom, transparent,#A37E44, #598043);
    border-color: linear-gradient(to right bottom, white, #A37E44, #598043);
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
    // border: 1px solid black;
    width: 1395px;
    height: 595px;
    border-radius: 18px;
    background: $white;
    z-index: 1;
  }
  @media #{$tablet} {
    .outerbox {
      width: 700px;
    }
    .insidebox{
      width: 697px;
    }
  }
  @media #{$mobile} {
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
