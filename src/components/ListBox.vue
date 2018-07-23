<template lang="pug">
  .listbox
    .row.justify-content-center
      .outer-container
      .inside-container
        .row.justify-content-start.add
          input.col-8.input(placeholder="..." ref="newitem") 
          button.col-3(@click="addItem") Add
        .list.row.justify-content-start(v-for="(item, index) in shoppingList")
          list-item.item(:index="index", :item="item", :list="shoppingList")
        br
        // button(@click="UpdateList(item, index, bought)") Update
</template>

<script>
import _ from 'lodash'
import { mapActions, mapState } from 'vuex'
import listItem from '@/components/List_Item'
import debug from 'debug'
let log = debug('component:LsitBox')
export default {
  name: 'listbox',
  props: [],
  data () {
    return {
    }
  },
  beforeCreate: function () {
  },
  mounted: function () {
    log('Mounted', this.shoppingList)
    this.setupListeners()
  },
  computed: {
    ...mapState('recipes', [
      'shoppingList'
    ])
  },
  methods: {
    ...mapActions('recipes', [
      'updateList',
      'addToList'
    ]),
    clicked (index) {
      this.bought = true
      const ShList = _.cloneDeep(this.shoppingList)
      ShList.splice(index, 1)
      this.updateList(ShList)
    },
    addItem () {
      if (this.$refs.newitem) {
        if (this.$refs.newitem.value !== '') {
          const newItem = this.$refs.newitem.value
          this.addToList(newItem)
          this.clearText()
        }
      }
    },
    UpdateList () {
      const update = this.clicked()
      this.updateList(update)
    },
    setupListeners () {
      window.addEventListener('keypress', this.onKeyPress.bind(this))
    },
    clearText () {
      this.$refs.newitem.value = ''
    },
    onKeyPress (event) {
      if (event.code === 'Enter') {
        this.addItem()
      }
    }
  },
  components: {
    'list-item': listItem
  }
}
</script>

<style scoped lang="scss">
@import "../styles/_variables";
@import "../styles/_mixins";
.listbox {
  .add {
    margin: 20px;
    height: 35px;
    font-size: 18px;
    .input {
      outline: none;
      border-radius: 10px;
      max-width: 350px;
    }
    button {
      outline: none;
      max-width: 70px;
      border-radius: 5px;
      color: #03355e;
      background: #fff;
      border: 2px solid #03355e;
      margin-left: 20px;
      cursor: pointer;
      &:hover {
        color: #fff;
        background: #f6b93b;
        border-color: #f6b93b;
        transition: all 0.4s ease 0s;
        transform: scale(1.03,1.03)
      }
      &:active {
        background: #eea30e;
        border-color: #eea30e;
        transform: translateY(0.5px);
      }
    }
  }
  
  .list {
    margin-left: 30px;
    .item {
      height: 35px;
    }
  }

  .outer-container {
    width: 650px;
    height: 750px;
    background: linear-gradient(to right bottom,transparent, #533716, transparent);
    box-shadow: 5px 5px 6px $gray10;
    border-radius: 10px;
    margin-top: 30px;
    margin-bottom: 50px;
    z-index: 0;
  }
  .inside-container {
    width: 580px;
    height: 690px;
    border-radius: 10px;
    background: #fff;
    box-shadow: inset 5px 5px 5px $gray90;
    position: absolute;
    top: 20%;
    z-index: 1;
    overflow-y: scroll;
  }

  @media #{$mobile} {
    .outer-container {
      width: 300px;
      height: 550px;
    }
    .inside-container {
      top: 23%;
      width: 280px;
      height: 500px;
    }
    .add {
      height: 30px;;
      .input {max-width: 150px;}
    }
    .list .item {
      height: 25px;
    }
  }
}
</style>
