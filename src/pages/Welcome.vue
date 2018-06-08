<template lang="pug">
  .welcome
    h3 Welcome Page
</template>

<script>
import debug from 'debug'
let log = debug('component:Welcome')
export default {
  name: 'welcome',
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
  }
}
</script>

<style scoped lang="scss">
@import "../styles/_variables";
@import "../styles/_mixins";
.welcome {
  
}
</style>
