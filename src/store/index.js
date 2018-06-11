import Vue from 'vue'
import Vuex from 'vuex'
import debug from 'debug'
import root from './root'
import recipes from './recipes'
import tasks from './tasks'

let log = debug('store')

Vue.use(Vuex)

root.modules = {
  tasks,
  recipes
}

const store = new Vuex.Store(root)

log('Initial State', store.state)

export default store
