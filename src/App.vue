<template lang="pug">
  #app
    app-nav.normal
    app-nav-phone.phone
    app-footer.footer
    //- transition(name="vt-page")
    router-view
</template>

<script>
import Nav from '@/components/Nav'
import NavPhone from '@/components/NavPhone'
import Footer from '@/components/Footer'
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
    'app-nav-phone': NavPhone,
    'app-footer': Footer
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
  .footer {
    bottom: 0;
    position: fixed;
    color: $white;
  }
}
</style>
