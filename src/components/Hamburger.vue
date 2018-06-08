<template lang="pug">
  .hamburger
    .line1
    .line2
</template>
<script>
import debug from 'debug'
let log = debug('component:Hamburger')
export default {
  name: 'hamburger',
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
<style>
.hamburger {
    width: 40px;
    height: 30px; 
    border: 2px solid white;
    border-radius: 10px;
    position: relative;
    cursor: pointer;
    background: transparent;
  }
  .line1 {
    border-bottom: 2px solid white;
    position: absolute;
    z-index: 2;
    top: 30%;
    left:20%;
    width: 22px;
  }
  .line2 {
    border-bottom: 2px solid white;
    position: absolute;
    z-index: 2;
    top: 60%;
    left:20%;
    width: 22px;
  }
</style>
