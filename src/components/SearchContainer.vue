<template lang="pug">
  .recipes  
    .row.justify-content-center  
      .outerbox
      .insidebox
    .row.justify-content-center
      .recipeBox
        carousel(:navigation-enabled="true" :per-page="3" :per-page-custom="[[360,1],[800,2],[1400,3]]")
          slide(v-for="(recipe, index) in searchedByTitle" :key="recipe+index")
            recipe-box(:data="recipe" :mesSystem="mesSystem")
        button(@click="reload") Go Back
</template>

<script>
import { mapGetters } from 'vuex'
import RecipeBox from '@/components/RecipeBox'
import { Carousel, Slide } from 'vue-carousel'
import debug from 'debug'
let log = debug('component:SearchContainer')
export default {
  name: 'searchContainer',
  props: [
    'mesSystem'
  ],
  data () {
    return {
    }
  },
  mounted: function () {
    log('Mounted')
  },
  computed: {
    ...mapGetters('recipes', [
      'searchedByTitle'
    ])
  },
  methods: {
    reload () {
      window.location.reload()
    }
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

  button {
    outline: none;
    font-size: 20px;
    cursor: pointer;
    border-radius: 5px;
    background: linear-gradient(transparent, white);
    box-shadow: 1px 1px 1px gray;
}

.recipeBox {
    width: 1300px;
    display: inline-block;
    position: relative;
    margin-top: 30px;
    margin-left: 60px;
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
