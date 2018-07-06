'use strict'

import debug from 'debug'
let log = debug('store:recipes')
import Vue from 'vue'
import axios from 'axios'

const recipes = {

  namespaced: true,
  state: {
    newItem: '',
    shoppingList: ['potatoes', 'marshmellows', 'yeast'],
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
      // /* eslint-disable */
      // function guid() {
      //   function s4() {
      //     return Math.floor((1 + Math.random()) * 0x10000)
      //       .toString(16)
      //       .substring(1);
      //   }
      //   return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
      // }
      // /* eslint-enable */
      // const id = guid()
      // recipe.id = id
      // // console.log('mutation: ', recipe.id)

      Vue.set(state.recipesObj, recipe.id, recipe)
      console.log(state.recipesObj)
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
    // EDIT_RECIPE_INGR (state, {recipe}) {
    //   log('mutation EDIT_RECIPE_INGR', recipe)
    //   const { id } = recipe
    //   Vue.set(state.recipesObj, id, recipe)
    // },

    UPDATE_SHOPPING_LIST (state, { responseList }) {
      log('mutation UPDATE_SHOPPING_LIST')
      if (responseList && Array.isArray(responseList)) {
        // let updatedList = []
        // responseList.forEach((item) => {
        //   updatedList.push(item)
        // })
        // Vue.set(state.shoppingList, responseList)
        state.shoppingList = responseList
      }
    },
    REMOVE_FROM_LIST (state, { index }) {
      log('mutation REMOVE_FROM_LIST', index)
      state.shoppingList.splice(index, 1)
      // console.log('item removed from the list ', state.shoppingList)
    },
    ADD_TO_LIST (state, { item }) {
      log('mutation ADD_TO_LIST', item)
      if (!state.shoppingList.includes(item)) {
        console.log(state.shoppingList)
        state.shoppingList.push(item)
      }
      console.log(state.shoppingList)

      // Vue.set(state.shoppingList)
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
    editRecipeFav (context, recipe) {
      axios.put('http://localhost:3001/recipes/fav', recipe).then(response => {
        context.commit('EDIT_RECIPE', { recipe })
      })
    },
    // editRecipeIngr (context, recipe) {
    //   context.commit('EDIT_RECIPE', { recipe })
    // },

    updateShoppingList ({ commit }) {
      log('this is getting called')
      axios.get('http://localhost:3001/shoppinglist').then(response => {
        const responseList = response.data
        commit('UPDATE_SHOPPING_LIST', { responseList })
      }).catch(error => {
        console.log(error)
      })
    },
    removeFromList (context, item) {
      const index = this.state.recipes.shoppingList.indexOf(item)
      console.log(item, index)
      context.commit('REMOVE_FROM_LIST', { index })
      axios.delete('http://localhost:3001/shoppinglist', {data: {ingredient_name: item}}).then(response => {
        console.log('remove from list action')
      }).catch(error => {
        console.log(error)
      })
    },
    addToList (context, item) {
      context.commit('ADD_TO_LIST', {item})
      axios.post('http://localhost:3001/shoppinglist', item).then(response => {
        console.log('add to list action')
        context.commit('ADD_TO_LIST', {item})
      }).catch(error => {
        console.log(error)
      })
    }
  }

}

export default recipes
