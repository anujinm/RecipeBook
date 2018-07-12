<template lang="pug">
  .title
    button.fav(v-if="isFav=='false'" @click="FavChanged")
      i.fas.fa-heart.notFav
    button.fav(v-if="isFav == 'true'" @click="FavChanged")
      i.fas.fa-heart.isFav
    button.delete(v-if="!showAddBox" @click="showDelete = !showDelete")
      i.fas.fa-angle-down
    button.deleteBtn(v-if="showDelete" @click="deleteRecipe") Delete

    input.name(v-if="showAddBox" v-model="newTitleVal" placeholder="title")
    // button.fav.camera(v-if="showAddBox")
    //   i.fas.fa-camera
      
    h5.name(v-if="!showAddBox") {{data.title}} 
    // img(:src='image')
    
    
</template>

<script>
import _ from 'lodash'
import { mapActions } from 'vuex'
import debug from 'debug'
let log = debug('component:RecipeBoxTitle')
export default {
  name: 'recipeBoxTitle',
  props: [
    'data',
    'image',
    'isFav',
    'showAddBox'
  ],
  data () {
    return {
      newTitleVal: '',
      showDelete: false
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
    ...mapActions('recipes', [
      'removeRecipe',
      'editRecipeFav'
    ]),
    deleteRecipe () {
      const recipe = this.data
      console.log('deleting : ', recipe.id)
      this.removeRecipe(recipe.id)
      // document.location.reload(true)
    },
    FavChanged () {
      // const { id } = this.data
      const recipe = _.cloneDeep(this.data)
      if (recipe.fav === 'true') {
        recipe.fav = 'false'
      } else if (recipe.fav === 'false') {
        recipe.fav = 'true'
      }
      this.editRecipeFav(recipe)
    }
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
    top: 30%;
    left: 25%;
    font-weight: 600;
    text-shadow: 1px 1px 2px $gray10;
    color: $white;
    font-size: .7em;
    white-space: normal;
    max-width: 120px;
  }
  button{
    outline: none;
    &.fav {
      width: 35px;
      height: 40px;
      border-radius: 10px;
      // border: none;
      margin: 10px;
      margin-left: 15px;
      // box-shadow:  1px 1px 2px $gray40;
      background: transparent;
      cursor: pointer;
      &:hover {
        transform: scale(1.1,1.1);
      }
      i {
        color: #eeeeeeaf; 
        margin-left:-3px;
        padding-bottom: 4px;
        font-size: 25px;
        &.isFav{color:  #990000;}
      }
      &.camera { margin-left: 170px; }
    }
    &.delete {
      background: transparent;
      border: none;
      position: absolute;
      z-index: 1;
      top: 6%;
      right: 2%;
      font-size: 15px;
      color: white;
      cursor: pointer;
    }
  }
  .deleteBtn {
    color: $gray30;
    cursor: pointer;
    background: transparent;
    border: none;
    position: absolute;
    top: 20%;
    right: 3%;
    padding: 5px;
    font-size: 15px;
    &:hover{ transform: scale(1.1,1.1)}
  }
  input {
    border-radius: 5px;
    background: transparent;
    padding: 5px;
  }
  img {
    width: 2em;
    position: absolute;
    top: 25%; 
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
