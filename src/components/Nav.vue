<template lang="pug">
  .nav
    router-link(to="/dashboard" v-bind:class="{ isInactive: !isRoot }" v-if="isLogedin") My Recipes
    router-link(to="/shoppinglist" v-if="isLogedin") Shopping List
    router-link(to="/mykitchen" v-if="isLogedin") In My Kitchen
    router-link(to="/welcome" v-if="!isLogedin") Home
    router-link(to="/welcome" @click.native="logout" v-if="isLogedin") Logout
</template>

<script>
import {mapState} from 'vuex'
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
    log('Mounted', this.token)
  },
  computed: {
    ...mapState('user', [
      'token'
    ]),
    isRoot () {
      return this.$store.state.route.path === '/dashboard'
    },
    isLogedin () {
      if (localStorage.token.length > 5) {
        return true
      } return false
    }
  },
  methods: {
    logout () {
      console.log('logging out')
      localStorage.setItem('token', null)
      window.location.reload()
    }
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
  color: $gray80;
  // text-shadow: 1px 1px 6px $gray50;
}

.router-link-active {
  background: $black;
  color: $white;
  // text-shadow: 1px 1px 1px $gray90;
  &.isInactive {
    background: transparent;
    color: white;
  }
}
</style>
