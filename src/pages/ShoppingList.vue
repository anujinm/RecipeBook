<template lang="pug">
  .shoppinglist
    h1 Shopping list Page
    home
</template>

<script>
import home from '@/components/Home'
import debug from 'debug'
let log = debug('component:ShoppingList')
export default {
  name: 'shoppinglist',
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
.shoppinglist {
  
}
</style>
