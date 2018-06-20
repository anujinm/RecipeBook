<template lang="pug">
  .nav
    router-link(to="/" v-bind:class="{ isInactive: !isRoot }") My Recipes
    router-link(to="/shoppinglist") ShoppingList
    router-link(to="/about") About
    input.searchbar(placeholder="  Search...") 
    i.fas.fa-search
      button
</template>

<script>
import debug from 'debug'
let log = debug('component:Nav')
export default {
  name: 'nav',
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
    isRoot () {
      return this.$store.state.route.path === '/dashboard'
    }
  },
  methods: {
    // search () {

    //   const list = []
    //   const keys = Object.keys(recipesObj)
    //   for (let i = 0; i < keys.length; i++) {
    //     const key = keys[i]
    //     const recipe = recipesObj[key]
    //     recipe.ingredients.forEach((ingredient) => {
    //       // if ingredient matches add recipe to list, otherwise dont do anything
    //       break
    //     })
    //   }
    // }
  },
  components: {
  }
}
</script>

<style scoped lang="scss">
@import "../styles/_variables";
@import "../styles/_mixins";
.nav {
  background: $gray10;
  padding-left: 6%;
  @media #{$tablet} {
    .searchbar { left: 28%; }
    i { left: 30%;}
  }
}
a {
  display: inline-block;
  font-size: 20px;
  font-weight: 100;
  padding: 15px 15px 5px 15px;
  color: $gray90;
  text-shadow: 1px 1px 6px $gray50;
}
.searchbar {
  font-size: 15px;
  border-radius: 5px;
  height: 23px;
  width: 130px;
  margin-top: 13px;
  position: relative;
  left: 55%;
  border: none;
  box-shadow: 2px 2px 2px $gray50;
}
i {
  position: relative;
  left: 55.5%;
  top: 18px;
  color: $gray90;
  font-size: 16px;
  text-shadow: 1px 1px 6px $gray70;
  button {
    cursor: pointer;
    background: transparent;
    border: none;
    outline: none;
    position: absolute;
    top: -20%;
    left: 0%;
    height: 30px;;
    width: 40px;
  }
}
.router-link-active {
  background: $black;
  color: $white;
  text-shadow: 1px 1px 1px $gray80;
  &.isInactive {
    background: transparent;
    color:$gray90;
  }
}
</style>
