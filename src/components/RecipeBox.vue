<template lang="pug">
  .box
    title-box.title(:title="data.title" :image="data.image" :isFav="data.fav")
    .main 
      ingredients-box.ingredients(:ingredients="data.ingredients")
      hr
      instructions-box.instructions(:instruction="data.instructions.instruction" :notes="data.instructions.notes")
</template>

<script>
// import { mapGetters } from 'vuex'
import debug from 'debug'
import Title from '@/components/Title'
import Ingredients from '@/components/Ingredients'
import Instructions from '@/components/Instructions'
let log = debug('component:RecipeBox')
export default {
  name: 'recipeBox',
  props: [
    'data'
  ],
  data () {
    return {
      title: 'Title'
    }
  },
  beforeCreate: function () {
  },
  mounted: function () {
    log('Mounted')
    log(this.data.instructions.instruction)
  },
  computed: {
    // ...mapGetters('recipes', [
    //   'recipes'
    // ])
  },
  methods: {
  },
  components: {
    'title-box': Title,
    'ingredients-box': Ingredients,
    'instructions-box': Instructions
  }
}
</script>

<style scoped lang="scss">
@import "../styles/_variables";
@import "../styles/_mixins";
.box {
  width: 300px;
  height: 500px;
  // border: 1px solid $gray80;
  background: $white;
  box-shadow:  3px 4px 10px 3px $gray60;
  position: relative;
  display: inline-block;
  z-index: 1;
  border-radius: 20px;
  margin:10px;

  .main {
    border: 1px solid $gray60;
    position: relative;
    overflow-y: scroll;
    // overflow-x: hidden;
    height: 380px;
    width: 280px;
    margin: 10px;
  }
  .ingredients {
    padding-left: 10px;
  }
  .instructions {
    padding-top: 0;
  }

  hr {margin: 8px;}
  @media #{$tablet} {
    width: 280px;
    .main {width: 260px;}
  }
  @media #{$mobile} {
    width: 260px;
    .main {width: 240px;}
  }
}
</style>
