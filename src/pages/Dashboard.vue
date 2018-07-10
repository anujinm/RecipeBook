<template lang="pug">
  .dashboard
    .row.justify-content-center.menubar
      .col-sm-2.favs
        i.fas.fa-heart
          button(@click="FavClicked = !FavClicked") Favorites
      .col-sm-4.sort
        input.searchRecipe(placeholder="Search recipes..." ref="inputTitle")
        i.fas.fa-search
          button(@click="findRecipe")
      
      .col-sm-1.add
        button(v-if="!showAddBox" @click="showAddBox = ! showAddBox") +
      .col-sm-1.close(v-if="showAddBox")
        button(@click="showAddBox = false") Close
      .col-sm-1.mesSystem(v-if="!showAddBox")
        select.select(@change="getSystem")
          option(value="imperial") Imperial
          option(value="metric") Metric
      .com-sm-2
    
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
  // overflow: scroll;
  // height: 0px;
  display: block;
  padding-bottom: 210px;
  background: linear-gradient(transparent, #DEE1E2);
  button {
    cursor: pointer;
    outline: none;
    border: none;
    background: transparent;
  }
  .row.menubar {
    margin-top: 70px;
    margin-bottom: 40px;
    button {
      background: linear-gradient($white, $gray90);
      font-size: 20px;
      border-radius: 5px;
    }
    .favs {
      margin: 10px 5px;
      &:hover { transform: scale(1.1,1.1); }
      i { color: #990000; }
      button { background: transparent; }
    }
  
    .sort {
      margin-top: 10px;
      .searchRecipe {
        font-size: 20px;
        border-radius: 5px;
        height: 35px;
        width: 200px;
        // margin-top: 50px;
        padding-left: 15px;
        position: relative;
        border: none;
        box-shadow: inset 0px 0 2px #a3a2a2;
        // box-shadow: 2px 2px 2px 2px $gray50;
        outline: none;
        color: rgb(88, 88, 88);
      }
      i {
         position: relative;
      // margin-top: 60px;
        margin-left: 10px;
        color: $gray90;
        font-size: 26px;
        text-shadow: 1px 1px 1px $gray10;
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

    .add button {
      box-shadow: 2px 2px 2px $gray60;
      margin-top: 20px;
      margin-left: 90%;
    }
    .close button {
      font-size: 15px;
      width: 80px;
      height: 30px;
      box-shadow: 2px 2px 2px $gray60;
      margin-top: 18px;
      // margin-left: 40%;
    }
    .mesSystem {
      .select {
        height: 30px;
        outline: none;
        background: transparent;
        // margin-left: 70%;
      }
      font-size: 15px;
      margin-top: 20px;
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
    .row {
      .favs {width: 100px;}
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
