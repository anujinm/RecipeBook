'use strict'

import debug from 'debug'
let log = debug('store:user')
import axios from 'axios'
import Vue from 'vue'
import Config from '../config'
import { isString } from 'util'

// const passwordHash = require('password-hash')
// import axios from 'axios'
// import Config from '../config'

const User = {
  namespaced: true,
  state: {
    token: '',
    username: [],
    userObj: {
    }
  },
  mutations: {
    // UPDATE_ALL_USERS (state, {Users}) {
    //   log('mutation UPDATE_ALL_USERS')
    //   if (Users && Array.isArray(Users)) {
    //     state.userObj = Users
    //   }
    // },
    ADD_USER (state, { user }) {
      log('mutation ADD_USER', user, state.userObj)
      Vue.set(state.userObj, user.email, user)
    },
    LOGIN_USER (state, { token }) {
      log('mutation LOGIN_USER')
      if (isString(token.data)) {
        state.token = token.data
        localStorage.setItem('token', token.data)
      }
    },
    GET_USERNAME (state, { response }) {
      log('mutation GET_USERNAME', response.data[0].name)
      state.username.push(response.data[0].name)
      console.log(state.username)
    }
  },
  getters: {},
  actions: {
    validateUser (context, { name, email, password }) {
      axios.post(`${Config.usersURL}`, {
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
    login (context, { username, password }) {
      return new Promise((resolve, reject) => {
        axios.post(`${Config.loginURL}`, {
          username,
          password
        }).then((token) => {
          resolve(token)
          context.commit('LOGIN_USER', {token})
          // context.commit('GET_USERNAME', {userID})
          context.commit
        }).catch(reject)
      })
    },
    getUsername ({commit}) {
      console.log('calling')
      axios.get(`${Config.usersURL}`, {
        headers: {
          'Authorization': `${localStorage.getItem('token')}`
        }
      }).then(response => {
        commit('GET_USERNAME', { response })
      }).catch(error => {
        console.log(error)
      })
    }
  }
}

export default User
