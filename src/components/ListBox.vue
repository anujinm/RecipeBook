<template lang="pug">
  .listbox
    .row.justify-content-center
      .outer-container
      .inside-container
        .row.justify-content-start.add
          input.col-8.input(placeholder="..." ref="newitem") 
          button.col-3(@click="addItem") Add
        .list.row.justify-content-start(v-for="(item, index) in shoppingList['list'].items")
          list-item.item(:index="index", :item="item", :list="shoppingList['list']")
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
      console.log(this.bought)
      this.bought = true
      console.log(this.bought)
      const ShList = _.cloneDeep(this.shoppingList)
      ShList.splice(index, 1)
      this.updateList(ShList)
    },
    addItem () {
      // console.log('click')
      const newItem = this.$refs.newitem.value
      // console.log(newItem)
      // if (newItem.length !== 0) {
      //   this.addToList(newItem)
      // }
      this.addToList(newItem)
    },
    UpdateList () {
      const update = this.clicked()
      this.updateList(update)
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
  background: linear-gradient(transparent, #DEE1E2);
  .add {
    margin: 20px;
    height: 35px;
    font-size: 18px;
    .input {
      outline: none;
      // border: 2px solid red;
      border-radius: 10px;
      max-width: 350px;
    }
    button {
      outline: none;
      max-width: 70px;
      border-radius: 10px;
      background: linear-gradient(to right bottom,#fff, rgb(131, 219, 163));
      border: 1px solid black;
      margin-left: 20px;
      cursor: pointer;
      &:hover {
        background: linear-gradient(to right bottom,#fff, rgb(67, 172, 105));
        transform: scale(1.03,1.03)
      }
      &:active {
        background: linear-gradient(to right bottom,#fff, rgb(19, 172, 75));
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
    background: linear-gradient(to right bottom, #185D31, #fff);
    box-shadow: 5px 5px 6px $gray30;
    border-radius: 10px;
    margin-top: 30px;
    margin-bottom: 250px;
    z-index: 0;
  }
  .inside-container {
    width: 580px;
    height: 690px;
    border-radius: 10px;
    background: #fff;
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
