<template lang="pug">
  .dashboard
    .row.justify-content-center.menubar
      .col--md-2.favs
        i.fas.fa-heart
          button(@click="FavClicked = !FavClicked") Favorites
      .col-md-4.sort
        input.searchRecipe(placeholder="Search recipes..." ref="inputTitle")
        i.fas.fa-search
          button(@click="findRecipe")
      
      .col-md-1.add
        button(v-if="!showAddBox" @click="showAddBox = ! showAddBox") +
      .col-md-1.close(v-if="showAddBox")
        button(@click="showAddBox = false") Close
      .col-md-1.mesSystem(v-if="!showAddBox")
        select.select(@change="getSystem")
          option(value="imperial") Imperial
          option(value="metric") Metric
      .com-md-2
      
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
  // background: linear-gradient(transparent, #DEE1E2, transparent);

  // background-image: url("https://image.freepik.com/free-photo/board-amidst-cooking-ingredients_23-2147749529.jpg");
  background-image: url("https://media.gettyimages.com/photos/herbs-condiments-and-spices-picture-id517302832?b=1&k=6&m=517302832&s=612x612&w=0&h=1w8bzO19N1L38roYQF9eg3NWS2avZeB9XyP8eSMgVMk=");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  // background: white;
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
      // background: linear-gradient($white, $gray90);
      font-size: 20px;
      border-radius: 5px;
    }
    .favs {
      margin: 10px 5px;
      &:hover { transform: scale(1.1,1.1); }
      i { color: #990000; }
      button { background: transparent; font-weight: 800; color: black;
 }
    }
  
    .sort {
      margin-top: 10px;
      .searchRecipe {
        &::placeholder {color: rgb(78, 78, 78);}
        background: transparent;
        font-size: 20px;
        border-radius: 20px;
        height: 35px;
        width: 230px;
        // margin-top: 50px;
        padding-left: 15px;
        position: relative;
        border: none;
        box-shadow: inset 0px 0 2px #616060;
        // box-shadow: 2px 2px 2px 2px $gray50;
        outline: none;
        color: rgb(88, 88, 88);
      }
      i {
         position: relative;
      // margin-top: 60px;
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

    .add button {
      box-shadow: 1px 1px 2px $gray30;
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
