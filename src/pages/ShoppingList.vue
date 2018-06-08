<template lang="pug">
  .shoppinglist
    h3 Shopping list Page
    list-box
</template>

<script>
import listbox from '@/components/ListBox'
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
    'list-box': listbox
  }
}
</script>

<style scoped lang="scss">
@import "../styles/_variables";
@import "../styles/_mixins";
.shoppinglist {
  
}
</style>
