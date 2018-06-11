<template lang="pug">
  .title
    button
      i.fas.fa-heart
    // h3.name(v-html="recipes.title")
    img(src='../../cupcake.png')
    
</template>

<script>
// import { mapGetters } from 'vuex'
import debug from 'debug'
let log = debug('component:RecipeBoxTitle')
export default {
  name: 'recipeBoxTitle',
  props: [
    'recipes'
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
  
  .name {
    position: absolute;
    top: 20%;
    left: 20%;
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
    i {color: #bd7272; margin-left:-3.9px;}
  }
  img {
    width: 3em;
    position: absolute;
    top: 0; 
    right: 0;
  }

  @media #{$tablet} {
    width: 280px;
    button{
      margin-left: 10px;
    }
  }
  @media #{$mobile} {
    width: 280px;
    button{
      margin-left: 10px;
    }
  }
}
</style>
