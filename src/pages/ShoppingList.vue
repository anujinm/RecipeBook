<template lang="pug">
  .shoppinglist
    h4 Shopping list:
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
  background-image: url("http://backgroundcheckall.com/wp-content/uploads/2017/12/cooking-background-images-13.jpg");
  background-position: center;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  text-align: center;
  h4 {
    margin-left: -300px;
    padding-top: 50px;
    font-weight: 500;
    text-shadow: 2px 2px 2px $gray70;
    }

  @media #{$mobile} {
    h4 { 
      font-size: 40px;
      margin-left: -30px;
    }
  }
}
</style>
