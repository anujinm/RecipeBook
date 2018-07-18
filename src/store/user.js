'use strict'

// import debug from 'debug'
// let log = debug('store:user')
import axios from 'axios'
// import Vue from 'vue'
// import axios from 'axios'
// import Config from '../config'

const User = {
  namespaced: true,
  state: {
    userObj: {
      'id': {
        name: {
          type: String,
          required: true,
          minlength: 5,
          maxlength: 50
        },
        email: {
          type: String,
          required: true,
          minlength: 5,
          maxlength: 255,
          unique: true
        },
        password: {
          type: String,
          required: true,
          minlength: 5,
          maxlength: 1024
        }
      }
    }
  },
  mutations: {
  },
  getters: {},
  actions: {
    validateUser (user) {
      axios.post('http://localhost:3001/users', user).then(response => {
        console.log('user added', user)
      }).catch(error => {
        console.log(error)
      })
    },
    updateAllUsers ({commit}) {
      axios.get('http://localhost:3001/users').then(response => {
        console.log('Users are: ', response)
      })
    }
  }
}

export default User
