<template lang="pug">
  .title
    button(v-if="!isFav")
      i.fas.fa-heart.notFav
    button(v-if="isFav")
      i.fas.fa-heart.isFav
    h5.name {{ title }}
    img(:src='image')
    // img(src='../../cupcake.png')
    
</template>

<script>
// import { mapGetters } from 'vuex'
import debug from 'debug'
let log = debug('component:RecipeBoxTitle')
export default {
  name: 'recipeBoxTitle',
  props: [
    'title',
    'image',
    'isFav'
  ],
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
    // ...mapGetters('recipes', [
    //   'recipes'
    // ])
  },
  methods: {
  },
  components: {
  }
}
</script>

<style scoped lang="scss">
@import "../styles/_variables";
@import "../styles/_mixins";
.title {
  width: 300px;
  height: 100px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  position: relative;
  background: linear-gradient(#A4CF74, #4F8A27);
  // vertical-align: top;
  
  .name {
    position: absolute;
    top: 20%;
    left: 20%;
    font-weight: 400;
    color: $gray10;
    font-size: large;
    white-space: normal;
    max-width: 120px;
  }
  button {
    width: 35px;
    height: 35px;
    border-radius: 10px;
    margin: 10px;
    margin-left: 15px;
    box-shadow:  1px 1px 2px $gray40;
    cursor: pointer;
    outline: none;
    &:hover {
      transform: scale(1.1,1.1);
    }
    i {
      color: #d19696; 
      margin-left:-3.9px;
      &.isFav{color: #990000;}
    }
  }
  img {
    width: 3em;
    position: absolute;
    top: 3%; 
    right: 3%;
  }

  @media #{$tablet} {
    width: 280px;
    button{
      margin-left: 10px;
    }
  }
  @media #{$mobile} {
    width: 260px;
    button{
      margin-left: 10px;
    }
  }
}
</style>
