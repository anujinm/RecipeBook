'use strict'

import debug from 'debug'
let log = debug('store:recipes')
import Vue from 'vue'
import axios from 'axios'
// import { VueRouter } from 'vue-router/types/router';

const recipes = {

  namespaced: true,
  state: {
    newItem: '',
    shoppingList: [],
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
    },
    RecipesByTitle: {},
    searchList: [],
    searchedRecipes: {
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
        state.shoppingList = responseList
      }
    },

    REMOVE_FROM_LIST (state, { index }) {
      log('mutation REMOVE_FROM_LIST', index)
      state.shoppingList.splice(index, 1)
    },

    ADD_TO_LIST (state, { item }) {
      log('mutation ADD_TO_LIST', item)
      if (!state.shoppingList.includes(item)) {
        console.log(state.shoppingList)
        state.shoppingList.push(item)
      }
      console.log(state.shoppingList)
    },

    ADD_TO_SEARCH (state, {item}) {
      log('mutation ADD_TO_SEARCH')
      state.searchList.push(item)
      for (var recipe in state.recipesObj) {
        var myrecipe = state.recipesObj[recipe]
        for (var ingredient in myrecipe.ingredients) {
          var myingredient = myrecipe.ingredients[ingredient]
          if (state.searchList.includes(myingredient.name)) {
            // console.log(state.searchList, myingredient)
            // console.log('Found it: ', recipe, myingredient.name)
            Vue.set(state.searchedRecipes, recipe, myrecipe)
          }
        }
      }
    },

    REMOVE_FROM_SEARCH (state, {index}) {
      log('mutation REMOVE_FROM_SEARCH')
      state.searchList.splice(index, 1)
      // console.log(state.searchList)
      for (var recipe in state.searchedRecipes) {
        var myrecipe = state.searchedRecipes[recipe]
        var inSearch = false
        for (var ingredient in myrecipe.ingredients) {
          var myingredient = myrecipe.ingredients[ingredient]
          // console.log(myingredient.name)
          if (state.searchList.includes(myingredient.name)) {
            inSearch = true
          }
        }
        if (inSearch === false) {
          Vue.delete(state.searchedRecipes, recipe, myrecipe)
        }
      }
    },

    FIND_BY_TITLE (state, { title }) {
      log('mutation FIND_BY_TITLE')
      for (var recipe in state.recipesObj) {
        const myrecipe = state.recipesObj[recipe]
        console.log(myrecipe.title, title)
        if (myrecipe.title.toLowerCase().includes(title.toLowerCase())) {
          Vue.set(state.RecipesByTitle, recipe, myrecipe)
          console.log(state.RecipesByTitle)
        }
      }
    }

  },

  getters: {
    recipes (state) {
      const recipes = Object.keys(state.recipesObj).map((id) => {
        return {id, ...state.recipesObj[id]}
      })
      return recipes
    },
    searchedByTitle (state) {
      const recipes = Object.keys(state.RecipesByTitle).map((id) => {
        return {id, ...state.RecipesByTitle[id]}
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
    editRecipeIngr (context, recipe) {
      context.commit('EDIT_RECIPE', { recipe })
    },

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
      context.commit('ADD_TO_LIST', { item })
      axios.post('http://localhost:3001/shoppinglist', item).then(response => {
        context.commit('ADD_TO_LIST', { item })
      }).catch(error => {
        console.log(error)
      })
    },

    addToSearchList (context, item) {
      context.commit('ADD_TO_SEARCH', { item })
    },
    removeFromSearchList (context, index) {
      context.commit('REMOVE_FROM_SEARCH', { index })
    },

    findByTitle (context, title) {
      context.commit('FIND_BY_TITLE', { title })
    }
  }

}

export default recipes
