<template lang="pug">
  .nav
    router-link(to="/" v-bind:class="{ isInactive: !isRoot }") My Recipes
    router-link(to="/shoppinglist") ShoppingList
    router-link(to="/about") About
    input.searchbar(placeholder="  Search...") 
    i.fas.fa-search
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
  },
  components: {
  }
}
</script>

<style scoped lang="scss">
@import "../styles/_variables";
@import "../styles/_mixins";
.nav {
  background: $gray20;
  padding-left: 10%;
}
a {
  display: inline-block;
  font-size: 20px;
  font-weight: 100;
  padding: 15px 15px 5px 15px;
  color: $gray90;
}
.searchbar {
  font-size: 15px;
  border-radius: 10px;
  height: 25px;
  width: 120px;
  margin-top: 13px;
  position: relative;
  left: 50%;
}
i {
  position: relative;
  left: 50.5%;
  top: 18px;
  color: $gray80;
  font-size: 16px;
}
.router-link-active {
  background: $black;
  color: $white;
  &.isInactive {
    background: transparent;
    color:$gray90;
  }
}
</style>
