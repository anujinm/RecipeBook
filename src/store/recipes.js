'use strict'

import debug from 'debug'
let log = debug('store:recipes')
import Vue from 'vue'
import axios from 'axios'

const recipes = {

  namespaced: true,
  state: {
    newItem: '',
    shoppingList: {
      'list': {
        items: ['potatoes', 'marshmellows', 'yeast']
      }
    },
    recipesObj: {
      // '000': {
      //   title: 'Cookies',
      //   image: require('../../Cookies.png'),
      //   fav: false,
      //   ingredients: [
      //     {
      //       name: 'flour',
      //       amount: '1.25',
      //       measurement: 'cup'
      //     },
      //     {
      //       name: 'sugar',
      //       amount: '1.5',
      //       measurement: 'cup'
      //     },
      //     {
      //       name: 'vanilla extract',
      //       amount: '0.33',
      //       measurement: 'tbsp'
      //     },
      //     {
      //       name: 'baking powder',
      //       amount: '1.66',
      //       measurement: 'tsp'
      //     },
      //     {
      //       name: 'unsulted butter',
      //       amount: '2.75',
      //       measurement: 'stick'
      //     },
      //     {
      //       name: 'whole milk',
      //       amount: '1',
      //       measurement: 'cup'
      //     },
      //     {
      //       name: 'eggs',
      //       amount: '2',
      //       measurement: '-'
      //     }
      //   ],
      //   instructions: {
      //     instruction: [
      //       'Mix: Flour + sugar + baking powder + salt',
      //       'Add: butter + vanilla + eggs + milk',
      //       'Oven: 350 degrees Flour',
      //       'Bake: 20 minutes'],
      //     notes: 'Can add chocolate chips'
      //   }
      // }
    }
  },
  mutations: {
    UPDATE_RECIPES (state, { recipes }) {
      log('mutation UPDATE_RECIPES')
      if (recipes && Array.isArray(recipes)) {
        recipes.forEach((recipe) => {
          Vue.set(state.recipesObj, recipe.id, recipe)
        })
      }
      // Vue.set(state, 'recipesObj', recipes)
    },
    ADD_RECIPE (state, { recipe }) {
      log('mutation ADD_RECIPE', recipe)
      /* eslint-disable */
      function guid() {
        function s4() {
          return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
      }
      /* eslint-enable */
      const id = guid()
      recipe.id = id
      Vue.set(state.recipesObj, id, recipe)
    },
    REMOVE_RECIPE (state, { recipeid }) {
      log('mutation REMOVE_RECIPE', recipeid)
      // const { id } = recipe
      Vue.delete(state.recipesObj, recipeid)
    },
    EDIT_RECIPE (state, { recipe }) {
      log('mutation EDIT_RECIPE', recipe)
      const { id } = recipe
      Vue.set(state.recipesObj, id, recipe)
    },
    UPDATE_LIST (state, { list }) {
      log('mutation UPDATE_LIST', list)
      Vue.set(state.shoppingList, 'list', list)
    },
    ADD_TO_LIST (state, { item }) {
      log('mutation ADD_TO_LIST', item)
      if (!state.shoppingList['list'].items.includes(item)) {
        state.shoppingList['list'].items.push(item)
      }
      Vue.set(state.shoppingList)
    }
  },

  getters: {
    recipes (state) {
      const recipes = Object.keys(state.recipesObj).map((id) => {
        return {id, ...state.recipesObj[id]}
      })
      return recipes
    }
  },

  actions: {
    updateAllRecipes ({ commit }) {
      axios.get('http://localhost:3001/recipes').then(response => {
        const { recipes } = response.data
        commit('UPDATE_RECIPES', { recipes })
      })
    },
    addRecipe (context, recipe) {
      axios.post('http://localhost:3001/recipes', recipe).then(response => {
        context.commit('ADD_RECIPE', { recipe })
      }).catch(error => {
        console.log(error)
      })
    },
    removeRecipe (context, recipeid) {
      axios.delete('http://localhost:3001/recipes', {data: {id: recipeid}}).then(response => {
        context.commit('REMOVE_RECIPE', { recipeid })
      })
    },
    editRecipe (context, recipe) {
      axios.put('http://localhost:3001/recipes', recipe).then(response => {
        context.commit('EDIT_RECIPE', { recipe })
      })
    },
    updateList (context, list) {
      context.commit('UPDATE_LIST', {list})
    },
    addToList (context, item) {
      context.commit('ADD_TO_LIST', {item})
    }
  }

}

export default recipes
