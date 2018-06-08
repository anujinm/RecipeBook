<template lang="pug">
  .nav
    router-link.t4(to="/" v-bind:class="{ isInactive: !isRoot }") Welcome
    router-link.t4(to="/dashboard") Dashboard
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
      return this.$store.state.route.path === '/welcome'
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
}
a {
  display: inline-block;
  padding: 30px;
}
.router-link-active {
  background: $brandPrimary;
  color: $white;
  &.isInactive {
    background: transparent;
    color: $brandPrimary;
  }
}
</style>
