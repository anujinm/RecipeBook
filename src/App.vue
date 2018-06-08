<template lang="pug">
  #app
    app-nav.normal
    app-nav-phone.phone
    //- transition(name="vt-page")
    router-view
</template>

<script>
import Nav from '@/components/Nav'
import NavPhone from '@/components/NavPhone'
import debug from 'debug'
let log = debug('App')
export default {
  name: 'app',
  mounted: function () {
    log('App Mounted')
    this.$store.dispatch('loading', false)
  },
  computed: {
  },
  methods: {
  },
  components: {
    'app-nav': Nav,
    'app-nav-phone': NavPhone
  }
}
</script>

<style lang="scss">
@import "./styles/main";
#app {
  .phone { visibility: hidden; }
  @media #{$mobile} {
    .normal { visibility: hidden; }
    .phone { visibility: visible; }  }
}
</style>
