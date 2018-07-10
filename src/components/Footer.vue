<template lang="pug">
  .footer
    h6 © 2018 Anujin’s Recipe Book, 14Four. All rights reserved 
</template>

<script>
import debug from 'debug'
let log = debug('component:Footer')
export default {
  name: 'footer',
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
  }
}
</script>

<style scoped lang="scss">
@import "../styles/_variables";
@import "../styles/_mixins";
.footer {
  background: $gray10;
  height: 50px;
  width: 100%;
  text-align: right;
  padding-top: 20px;
  padding-right: 20px;
}
</style>
