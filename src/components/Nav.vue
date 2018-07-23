<template lang="pug">
  .nav
    h6(v-if="isLogedin" v-for="name in username") Welcome, {{ name }}!
    // h6(v-if="isLogedin") {{ uname }}
    router-link(to="/dashboard" v-bind:class="{ isInactive: !isRoot }" v-if="isLogedin") My Recipes
    router-link(to="/shoppinglist" v-if="isLogedin") Shopping List
    router-link(to="/mykitchen" v-if="isLogedin") In My Kitchen
    router-link(to="/welcome" v-if="!isLogedin") Home
    router-link.logout(to="/welcome" @click.native="logout" v-if="isLogedin") Logout
</template>

<script>
import { mapState, mapActions } from 'vuex'
import debug from 'debug'
let log = debug('component:Nav')
export default {
  name: 'navigation',
  props: [],
  data () {
    return {
      uname: this.getUsername()
    }
  },
  beforeCreate: function () {
  },
  mounted: function () {
    log('Mounted')
  },
  computed: {
    ...mapState('user', [
      'username'
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
    ...mapActions('user', [
      'getUsername'
    ]),
    logout () {
      console.log('logging out')
      localStorage.setItem('token', null)
      // this.getName()
      window.location.reload()
    },
    getName () {
      if (this.isLogedin) {
        this.name = this.state.username
        console.log('name: ', name)
        return name
      }
    }
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
h6 {
  text-transform: uppercase;
  padding: 10px;
  font-family: 'Roboto', sans-serif;
  color: rgb(248, 205, 140);
  display: inline-block;
  font-size: 20px;
  font-weight: 800;
  margin-top: 8px;
}
a {
  display: inline-block;
  font-size: 20px;
  font-weight: 100;
  padding: 15px 15px 5px 15px;
  color: $gray80;
  // text-shadow: 1px 1px 6px $gray50;
}
  .logout {
    // color: red;
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
