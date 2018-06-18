<template lang="pug">
  .dashboard
    .row.justify-content-start
      .col-1
      .col-sm-2.favs
        i.fas.fa-heart
          button(@click="FavClicked = !FavClicked") Favorites
      .col-sm-2.sort
        select.select
          option all
          option dinner
          option lunch
          option breakfast
          option baking
          option soup
      .col-sm-2
      .col-sm-2.add
        button(v-if="!showAddBox" @click="showAddBox = ! showAddBox") +
      .col-sm-1.close(v-if="showAddBox")
        button(@click="showAddBox = false") Close
      .col-sm-2.mesSystem(v-if="!showAddBox")
        select.select(@change="getSystem")
          option(value="imperial") Imperial
          option(value="metric") Metric
    r-container.r-container(:showAddBox="showAddBox" :mesSystem="mesSystem" :FavClicked="FavClicked")
</template>

<script>
import debug from 'debug'
import recipesContainer from '@/components/RecipesContainer'
let log = debug('component:Dashboard')
export default {
  name: 'dashboard',
  props: [],
  data () {
    return {
      showAddBox: false,
      FavClicked: false,
      mesSystem: 'imperial'
    }
  },
  beforeCreate: function () {
  },
  mounted: function () {
    log('Mounted')
    // log(this.showAddBox)
  },
  computed: {
  },
  methods: {
    getSystem (event) {
      const { value } = event.target
      this.mesSystem = value
      console.log(this.mesSystem)
    }
  },
  components: {
    'r-container': recipesContainer
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
  padding-bottom: 100px;
  background: linear-gradient(transparent, #DEE1E2);
  .row {
    margin-top: 40px;
    margin-bottom: 10px;
    button {
      background: linear-gradient($white, $gray90);
      font-size: 20px;
      cursor: pointer;
      border-radius: 5px;
      outline: none;
    }
    .favs {
      margin: 10px 5px;
      &:hover {
        transform: scale(1.1,1.1);
      }
      i {color: #990000;}
      button {
        background: transparent;
        border: none;
      }
    }
    .sort {
      margin: 18px 0px 0 0;
      font-size: 20px;
      .select {
        outline: none;
        background: transparent;
      }
    }
    .add button {
      box-shadow: 2px 2px 2px $gray60;
      margin-top: 18px;
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
