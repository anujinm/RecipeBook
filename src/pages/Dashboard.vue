<template lang="pug">
  .dashboard
    .row.justify-content-center
      h4 Dashboard Page
      r-container.r-container
</template>

<script>
import debug from 'debug'
import recipesContainer from '@/components/RecipesContainer'
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
    'r-container': recipesContainer
  }
}
</script>

<style scoped lang="scss">
@import "../styles/_variables";
@import "../styles/_mixins";
.dashboard {
  .r-container {
    margin-top: 100px;
    width: 100%;
    height: 100%;
    
  }
}
</style>
