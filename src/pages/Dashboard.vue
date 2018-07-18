<template lang="pug">
  .dashboard
    .row.justify-content-start.menubar
      .col-2
      .col-2.favs
        i.fas.fa-heart
          button(@click="FavClicked = !FavClicked") Favorites
      .col-4.sort
        input.searchRecipe(placeholder="Search recipes..." ref="inputTitle")
        i.fas.fa-search
          button(@click="findRecipe")
      
      .col-1.mesSystem(v-if="!showAddBox")
        select.select(@change="getSystem")
          option(value="imperial") Imperial
          option(value="metric") Metric
      .col-1
        button.add(v-if="!showAddBox" @click="showAddBox = ! showAddBox") +
        button.close(v-if="showAddBox" @click="showAddBox = false") Close
      
    .row.justify-content-center(v-if="!searchClicked")
      r-container.r-container(:showAddBox="showAddBox" :mesSystem="mesSystem" :FavClicked="FavClicked")
    .row.justify-content-center(v-if="searchClicked")
      search-container(:mesSystem="mesSystem")
</template>

<script>
import debug from 'debug'
import { mapActions } from 'vuex'
import recipesContainer from '@/components/RecipesContainer'
import searchContainer from '@/components/SearchContainer'
let log = debug('component:Dashboard')
export default {
  name: 'dashboard',
  props: [],
  data () {
    return {
      showAddBox: false,
      FavClicked: false,
      searchClicked: false,
      mesSystem: 'imperial'
    }
  },
  beforeCreate: function () {
  },
  mounted: function () {
    log('Mounted')
    this.setupListeners()
  },
  computed: {
  },
  methods: {
    ...mapActions('recipes', [
      'findByTitle'
    ]),
    getSystem (event) {
      const { value } = event.target
      this.mesSystem = value
      console.log(this.mesSystem)
    },
    findRecipe () {
      if (this.$refs.inputTitle.value !== '') {
        this.searchClicked = true
        this.findByTitle(this.$refs.inputTitle.value)
      }
    },
    setupListeners () {
      window.addEventListener('keypress', this.onKeyPress.bind(this))
    },
    onKeyPress (event) {
      if (event.code === 'Enter') {
        this.findRecipe()
      }
    }
  },
  components: {
    'r-container': recipesContainer,
    'search-container': searchContainer
  }
}
</script>

<style scoped lang="scss">
@import "../styles/_variables";
@import "../styles/_mixins";
.dashboard {
  display: block;
  padding-bottom: 210px;
  background-image: url("http://www.tokkoro.com/picsup/3065640-allium_aromatic_background_bear_bunch_cooking_eating_food_forest_fresh_garlic_green_healthy_herb_herbal_ingredient_isolated_kitchen_leaf_leek_onion_organic_plant_ramson_rope_sauce_seasoning_soup_.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 910px;
  
  button {
    cursor: pointer;
    outline: none;
    border: none;
    background: transparent;
  }
  .row.menubar {
    padding-top: 70px;
    margin-bottom: 40px;
    button {
      font-size: 20px;
      border-radius: 5px;
    }
    .favs {
      margin: 10px 65px;
      &:hover { transform: scale(1.1,1.1); }
      i { color: #990000; }
      button { background: transparent; font-weight: 800; color: #272727;
 }
    }
  
    .sort {
      margin-top: 10px;
      text-align: right;
      .searchRecipe {
        color: #181818;
        &::placeholder {color:#181818; opacity: .7;}
        background: transparent;
        font-size: 20px;
        height: 35px;
        width: 230px;
        padding-left: 15px;
        position: relative;
        border: none;
        box-shadow: 0px 1px #7a7a7a;
        outline: none;
      }
      i {
         position: relative;
        margin-left: -30px;
        color: $gray90;
        font-size: 20px;
        text-shadow: 1px 1px 1px $gray30;
        button {
          position: absolute;
          background: transparent;
          bottom: -8px;
          left: -10px;
          height: 40px;
          width: 40px;
        }
      }

    }

    .add{
      box-shadow: 1px 1px 4px $gray20;
      margin-top: 20px;
    }
    .close {
      font-size: 15px;
      width: 80px;
      height: 30px;
      box-shadow: 2px 2px 2px $gray60;
      margin-top: 18px;
    }
    .mesSystem {
      max-width: 120px;
      font-size: 15px;
      margin-top: 20px;
      .select {
        height: 30px;
        outline: none;
        background: transparent;
        border:none;
      }
    }
  }
  
  &.r-container {
    left: auto;
    // overflow: scroll;
    width: 100%;
    height: 100%;
    z-index: 2;
    position: absolute;
    display: block; 
  }

  @media #{$tablet} {
    .row.menubar {
      .favs {margin: 10px 5px;}
      // .add button{ margin-right: 10%;}
      // .close button {margin-left: 200%;}
      // .mesSystem {margin-left: 0%;}
    }
  }
  @media #{$mobile} {
    .row {
      margin-left: 20px;
      display: inline-block;
      .add button{ margin-left: 0px;}
      .mesSystem {margin-left: 0px;}
    }
  }
}
</style>
