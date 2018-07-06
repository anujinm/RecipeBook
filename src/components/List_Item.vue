<template lang="pug">
  .listItem
    .row.justify-content-start
      button.clicked(@click="clicked(item, index, bought)")
        i.fas.fa-check(v-if="!bought")
      h5 {{ item }}
      h5.hline
</template>

<script>
import _ from 'lodash'
import { mapActions } from 'vuex'
import debug from 'debug'
let log = debug('component:ListItem')
export default {
  name: 'listitem',
  props: [
    'index',
    'item',
    'list'
  ],
  data () {
    return {
      bought: false
    }
  },
  beforeCreate: function () {
  },
  mounted: function () {
    log('Mounted')
  },
  computed: {
    // ...mapState('recipes', [
    //   'shoppingList'
    // ])
  },
  methods: {
    ...mapActions('recipes', [
      'removeFromList'
    ]),
    clicked (item, index, bought) {
      let shlist = _.cloneDeep(this.list)
      console.log('before: ', shlist)
      if (bought === false) {
        console.log(false)
        shlist.splice(index, 1)
      }
      console.log('Index to be deleted: ', index, item)
      this.removeFromList(item, index)
      document.location.reload(true)
      // this.updateList(shlist)
      console.log('after: ', this.list)
    }
  },
  components: {
  }
}
</script>

<style scoped lang="scss">
@import "../styles/_variables";
@import "../styles/_mixins";
.listItem {
  .hline {
    width: 500px;
    border-bottom: 1.2px solid gray;
  }
  h5 {
    margin-left: 10px;
    font-size: 28px;
    text-shadow: 1px 1px 1px $gray70;
  }
  button {
    outline: none;
    margin-left: 20px;
    height: 23px;
    width: 23px;
    border-radius: 5px;
    margin-top: 3px;
    box-shadow: 1px 1px 1px $gray90;
    i {
      font-size: 20px;
      position: relative;
      display: flex;
      margin-left: -5px;
      color: transparent;
      &:active { color: rgb(43, 160, 43);}
    }
    &:active {
      filter: blur(0.3px)
    }
  }


  @media #{$mobile} {
    .hline { width: 230px;}
    h5 {font-size: 15px; margin-top: 3px;}
    button {
      height: 15px;
      width: 15px;
      i {font-size: 10px;}
    }
  }
}
</style>
