'use strict'

import debug from 'debug'
let log = debug('store:user')
import axios from 'axios'
import Vue from 'vue'
// import axios from 'axios'
// import Config from '../config'

const User = {
  namespaced: true,
  state: {
    userObj: {
    }
  },
  mutations: {
    UPDATE_ALL_USERS (state, {Users}) {
      log('mutation UPDATE_ALL_USERS')
      if (Users && Array.isArray(Users)) {
        state.userObj = Users
      }
    },
    ADD_USER (state, { user }) {
      log('mutation ADD_USER', user, state.userObj)
      Vue.set(state.userObj, user.email, user)
    }
  },
  getters: {},
  actions: {
    validateUser (context, user) {
      axios.post('http://localhost:3001/users', user).then(response => {
        if (response.data !== 'Email is taken!') {
          context.commit('ADD_USER', {user})
        }
      }).catch(error => {
        console.log(error)
      })
    },
    updateAllUsers ({commit}) {
      axios.get('http://localhost:3001/users').then(response => {
        const Users = response.data
        commit('UPDATE_ALL_USERS', { Users })
      })
    }
  }
}

export default User
