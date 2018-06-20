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
import Dashboard from '@/pages/Dashboard'
import debug from 'debug'
import axios from 'axios'

let log = debug('App')
export default {
  name: 'app',
  mounted: function () {
    log('App Mounted')
    this.$store.dispatch('loading', false)
    axios.get('http://localhost:3001/recipes', {
      id: 1
    }).then(data => {
      console.log(data)
    })
  },
  computed: {
  },
  methods: {
  },
  components: {
    'app-nav': Nav,
    'app-nav-phone': NavPhone,
    'app-footer': Footer,
    'app-dashboard': Dashboard
  }
}
</script>

<style lang="scss">
@import "./styles/main";
#app {
  height: auto;
  .phone { visibility: hidden; }
  @media #{$mobile} {
    .normal { visibility: hidden; }
    .phone { visibility: visible; z-index: 4;}  }
  .footer {
    bottom: 0;
    position: fixed;
    color: $white;
    z-index: 3;
  }
}
</style>
