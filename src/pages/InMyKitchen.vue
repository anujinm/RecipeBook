<template lang="pug">
  .kitchen
    .row.justify-content-center
      .search
        input.searchbar(placeholder="Search..." ref="searchInput")
        i.fas.fa-search
          button(@click="addToSearch")
    .row.justify-content-center
      .list
        h6.item(v-for="(ingredient, index) in searchList")  {{ ingredient }}
          i.fas.fa-times
            button(@click="removeItem(index)")
    .row.justify-content-center  
      .outerbox
      .insidebox
        .recipeBox
          .row.justify-content-center
            carousel(:navigation-enabled="true" :per-page="3" :per-page-custom="[[360,1],[800,2],[1400,3]]")
              slide(v-for="(recipe, index) in searchedRecipes" :key="'recipe' + index")
                recipe-box(:data="recipe" :mesSystem="mesSystem")
</template>

<script>
import { mapActions, mapState } from 'vuex'
import RecipeBox from '@/components/RecipeBox'
import { Carousel, Slide } from 'vue-carousel'
import debug from 'debug'
let log = debug('component:InMyKitchen')
export default {
  name: 'kitchen',
  props: [
  ],
  data () {
    return {
      mesSystem: 'imperial',
      showAddBox: false
    }
  },
  beforeCreate: function () {
  },
  mounted: function () {
    log('Mounted')
    this.setupListeners()
  },
  computed: {
    ...mapState('recipes', [
      'searchedRecipes',
      'searchList'
    ])
  },
  methods: {
    ...mapActions('recipes', [
      'addToSearchList',
      'removeFromSearchList'
    ]),
    addToSearch () {
      this.addToSearchList(this.$refs.searchInput.value)
      this.clearText()
    },
    removeItem (index) {
      this.removeFromSearchList(index)
    },
    clearText () {
      this.$refs.searchInput.value = ''
    },
    setupListeners () {
      window.addEventListener('keypress', this.onKeyPress.bind(this))
    },
    onKeyPress (event) {
      if (event.code === 'Enter') {
        this.addToSearch()
      }
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
.kitchen {
  height: 910px;
  background: linear-gradient(transparent, #DEE1E2);
  font-family: 'Roboto', sans-serif;
  button {
    cursor: pointer;
    background: transparent;
    border: none;
    outline: none;
  }
  .search {
    margin-top: 50px;
    .searchbar {
      font-size: 20px;
      border-radius: 5px;
      height: 43px;
      width: 230px;
      // margin-top: 50px;
      padding-left: 15px;
      position: relative;
      border: none;
      box-shadow: 2px 2px 2px $gray50;
      outline: none;
      color: rgb(88, 88, 88);
    }
    i {
      position: relative;
      // margin-top: 60px;
      margin-left: 10px;
      color: $gray90;
      font-size: 26px;
      text-shadow: 1px 1px 6px $gray10;
      button {
        position: absolute;
        bottom: 0;
        left: -10px;
        height: 40px;
        width: 40px;
      }
    }
  }
  .list {
    margin: 20px;
    width: 600px;

    .item {
      // width: 160px;
      // height: 30px;
      margin: 5px;
      padding: 5px;
      display: inline;
      text-align: center;
      border: 1px solid gray;
      border-radius: 5px;
      background: linear-gradient(to right bottom,white,#DEE1E2);

      i {
        font-size: 10px;
        color: gray;
        position: relative;
        top: -10%;
        right: -2px;
        button {
          position: absolute;
          bottom: 0;
          left: -5px;
          height: 10px;
        }
      }
    }
  }
  .outerbox {
    border: none;
    background-image: linear-gradient(to right bottom, transparent,#A37E44, #598043);
    width: 1400px;
    height: 650px;
    border-radius: 18px;
    z-index: 0;
    position: absolute;
    margin-top: 20px;
    box-shadow: 5px 5px 6px $gray30;
  }
  .insidebox {
    margin-top: 2px;
    position: absolute;
    margin-top: 23px;
    width: 1395px;
    height: 645px;
    border-radius: 18px;
    background: linear-gradient($white, #DEE1E2);
    z-index: 1;
  
    .recipeBox{
      // width: 1200px;
      // display: inline-block;
      // position: relative;
      margin-top: 10px;
      margin-left: 60px;
      z-index: 2;
    }
  }

  @media #{$tablet} {
    .outerbox {
      width: 700px;
    }
    .insidebox{
      width: 697px;
      .recipeBox{
        width: 605px;
        margin-left: 45px;
      }
    }
  }
  @media #{$mobile} {
    // width: 320px;
    .outerbox {
      width: 340px;
      height: 600px;
    }
    .insidebox{
      height: 597px;
      width: 335px;
      .recipeBox {
        margin-top: 0px;
        width: 340px;
        margin-left: 15px;
      }
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
    width: 605px;
    .VueCarousel-navigation-button {
      margin-right: 0px;
    }
  }
  @media #{$mobile} {
    width: 320px;
    .VueCarousel-navigation-button {
      margin-left: 20px;
      margin-right: 50px;
    }
  }
}
</style>
