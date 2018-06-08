<template lang="pug">
  .dashboard
    .row.justify-content-start
      .col-1
      .col-md-2.favs
        i.fas.fa-star
        button Favorites
      .col-md-2.sort
        select.select
          option all
          option dinner
          option lunch
          option breakfast
          option baking
          option soup
    r-container.r-container
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
    .favs {
      margin: 10px 5px;

      i {color: #F8E71C;}
      button {
        background: transparent;
        font-size: 20px;
        cursor: pointer;
        border: none;
        outline: none;
      }
    }
    .sort {
      margin: 18px 0px;
      font-size: 20px;
      .select {
        outline: none;
        background: transparent;
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
  @media #{$mobile} {
    .row {
      margin-left: 20px;
      display: inline-block;
    }
  }
}
</style>
