<template lang="pug">
  .dashboard
    h1 Dashboard Page
    home
</template>

<script>
import home from '@/components/Home'
import debug from 'debug'
let log = debug('component:Dashboard')
export default {
  name: 'dashboard',
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
  },
  methods: {
  },
  components: {
    'home': home
  }
}
</script>

<style scoped lang="scss">
@import "../styles/_variables";
@import "../styles/_mixins";
.dashboard {
  
}
</style>
