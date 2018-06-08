<template lang="pug">
  #app
    app-nav
    //- transition(name="vt-page")
    router-view
</template>

<script>
import Nav from '@/components/Nav'
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
    'app-nav': Nav
  }
}
</script>

<style lang="scss">
@import "./styles/main";
#app {
}
</style>
