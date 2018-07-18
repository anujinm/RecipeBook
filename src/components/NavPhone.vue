<template lang="pug">
  .nav
    button(@click="showMenu = !showMenu") 
      hamburger
    transition(name="slide" type="animation")
      .show(v-if="showMenu")
        router-link(to="/dashboard" v-bind:class="{ isInactive: !isRoot }") My Recipes
        router-link(to="/shoppinglist") Shopping List
        router-link(to="/mykitchen") In My Kitchen
        router-link(to="/welcome") Home
</template>

<script>
import debug from 'debug'
let log = debug('component:NavPhone')
import hamburger from '@/components/Hamburger'
export default {
  name: 'navPhone',
  props: [],
  data () {
    return {
      showMenu: false
    }
  },
  beforeCreate: function () {
  },
  mounted: function () {
    log('Mounted')
  },
  computed: {
    isRoot () {
      return this.$store.state.route.path === '/dashboard'
    }
  },
  methods: {
  },
  components: {
    'hamburger': hamburger
  }
}
</script>

<style scoped lang="scss">
@import "../styles/_variables";
@import "../styles/_mixins";
.nav {
  background: $gray10;
  width: 100%;
  z-index: 1;
  position: absolute;
  top: 0%;
  padding: 10px;
  .show {
    width: 414px;
    height: 936px;
    transition: all 0.5s ease-in-out;  
  }
  .hamburger {
    z-index: 3;
  }
  .searchbar {
    font-size: 20px;
    height: 25px;
    border: none;
    border-radius: 5px;
    position: relative;
    left: 4%;
  }
  i {
    position: relative;
    left: 7%;
    color: $gray90;
    font-size: 18px;
    button {
      cursor: pointer;
      // background: red;
      position: absolute;
      top: -90%;
      left: -80%;
      width: 40px;
    }
  }
  button {
    background: transparent;
    border: none; 
    outline: none; 
    height: 30px;
    margin: 10px;
  }
  a {
    width: 100%;
    display: block;
    font-size: 20px;
    font-weight: 100;
    padding: 15px 15px 5px 15px;
    color: $gray90;
  }
  .router-link-active {
    background: $black;
    color: $white;
    // text-shadow: 2px 1px 5px $gray90;
    &.isInactive {
      background: transparent;
      color: white;
    }
  }

  .slide-enter{
    opacity: 0;
  }
  .slide-enter-active{
    animation: slide-in .5s ease-out forwards;
    transition: opacity .5s;
  }
  .slide-leave {
  }
  .slide-leave-active {
    animation: slide-out .5s ease-out forwards;
    transition: opacity .5s;
    opacity: 0;
  }
  @keyframes slide-in {
    from {
      transform: translateY(-50px);
    } to {
      transform: translateY(0);
    }
  }
  @keyframes slide-out {
    from {
      transform: translateY(0);
    } to {
      transform: translateY(-50px);
    }
  }
}
</style>
