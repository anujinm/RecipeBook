<template lang="pug">
  .recipes
    .outerbox
    .insidebox
</template>

<script>
import { mapActions, mapState } from 'vuex'
import debug from 'debug'
let log = debug('component:RecipesContainer')
export default {
  name: 'recipesContainer',
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
    ...mapState('tasks', {
      tasksSorted: state => state.all.slice().sort((a, b) => a.title.localeCompare(b.title))
    })
  },
  methods: {
    ...mapActions('tasks', [
      'syncTask',
      'setActiveTask'
    ]) // ,
    // toggleComplete (task) {
    //   task.isComplete = !task.isComplete
    // }
  },
  components: {
  }
}
</script>

<style scoped lang="scss">
@import "../styles/_variables";
@import "../styles/_mixins";
.recipes {
  .outerbox {
    border: none;
    background-image: linear-gradient(transparent, #A37E44, #598043);
    border-color: linear-gradient($white, #A37E44, #598043);
    width: 1400px;
    height: 600px;
    border-radius: 18px;
    z-index: -1;
    position: absolute;
    top: 22.2%;
    left: 7.4%;
    box-shadow: 5px 5px 6px $gray30;
  }
  .insidebox {
    position: absolute;
    top: 22.5%;
    left: 7.5%;
    // border: 1px solid black;
    width: 1395px;
    height: 595px;
    border-radius: 18px;
    background: $white;
    z-index: 0;
  }
  @media #{$tablet} {
    .outerbox {
      width: 700px;
    }
    .insidebox{
      width: 697px;
    }
  }
  @media #{$mobile} {
    .outerbox {
      width: 360px;
      height: 700px;
      top: 30%;
      margin-bottom: 40px;
    }
    .insidebox{
      left: 33px;
      height: 697px;
      width: 355px;
      top: 30.5%;
      margin-bottom: 40px;
    }
  }
}
</style>
