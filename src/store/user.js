'use strict'

import debug from 'debug'
let log = debug('store:user')
import axios from 'axios'
import Vue from 'vue'
import { isString } from 'util'
// const passwordHash = require('password-hash')
// import axios from 'axios'
// import Config from '../config'

const User = {
  namespaced: true,
  state: {
    token: '',
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
    },
    LOGIN_USER (state, { token }) {
      log('mutation LOGIN_USER')
      state.token = token.data
      if (isString(token.data)) {
        localStorage.setItem('token', token.data)
        console.log('token: ', token.data)
      }
    }
  },
  getters: {},
  actions: {
    validateUser (context, { name, email, password }) {
      axios.post('http://localhost:3001/users', {
        name,
        email,
        password
      }).then(response => {
        const user = response.data
        if (response.data !== 'Email is taken!') {
          context.commit('ADD_USER', {user})
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // updateAllUsers ({commit}) {
    //   axios.get('http://localhost:3001/users').then(response => {
    //     const Users = response.data
    //     commit('UPDATE_ALL_USERS', { Users })
    //   })
    // },
    login (context, { username, password }) {
      return new Promise((resolve, reject) => {
        axios.post('http://localhost:3001/login', {
          username,
          password
        }).then((token) => {
          resolve(token)
          context.commit('LOGIN_USER', {token})
        }).catch(reject)
      })
    }
  }
}

export default User
