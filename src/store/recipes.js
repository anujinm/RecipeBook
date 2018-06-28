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
      // },
      // '001': {
      //   title: 'Cupcakes',
      //   image: require('../../cupcake.png'),
      //   fav: false,
      //   ingredients: [
      //     {
      //       name: 'flour',
      //       amount: '1.5',
      //       measurement: 'cup'
      //     },
      //     {
      //       name: 'sugar',
      //       amount: '1',
      //       measurement: 'cup'
      //     },
      //     {
      //       name: 'vanilla extract',
      //       amount: '0.5',
      //       measurement: 'tsp'
      //     },
      //     {
      //       name: 'baking powder',
      //       amount: '1.25',
      //       measurement: 'tsp'
      //     },
      //     {
      //       name: 'unsulted butter',
      //       amount: '1',
      //       measurement: 'stick'
      //     },
      //     {
      //       name: 'whole milk',
      //       amount: '1.66',
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
      // },
      // '002': {
      //   title: 'Macha Cheesecake',
      //   image: require('../../gtcheesecake.jpg'),
      //   fav: true,
      //   ingredients: [
      //     {
      //       name: 'graham cracker crumbs',
      //       amount: '1.75',
      //       measurement: 'cup'
      //     },
      //     {
      //       name: 'sugar',
      //       amount: '1.25',
      //       measurement: 'cup'
      //     },
      //     {
      //       name: 'vanilla extract',
      //       amount: '2',
      //       measurement: 'tsp'
      //     },
      //     {
      //       name: 'cream cheese',
      //       amount: '24',
      //       measurement: 'oz'
      //     },
      //     {
      //       name: 'unsulted butter',
      //       amount: '2.33',
      //       measurement: 'stick'
      //     },
      //     {
      //       name: 'sour cream',
      //       amount: '1',
      //       measurement: 'cup'
      //     },
      //     {
      //       name: 'eggs',
      //       amount: '3',
      //       measurement: '-'
      //     }
      //   ],
      //   instructions: {
      //     instruction: [
      //       'Mix: Graham crumbs + butter + sugar',
      //       '9-inch springform pan',
      //       'Mix: cream cheese',
      //       'Add: vanilla + sour cream + eggs',
      //       'Oven: 350 degrees Flour',
      //       'Bake: 60-70 minutes'],
      //     notes: 'Can add macha'
      //   }
      // },
      // '003': {
      //   title: 'Lasagna',
      //   image: require('../../cheesecake2.png'),
      //   fav: true,
      //   ingredients: [
      //     {
      //       name: 'lasagna noodles',
      //       amount: '9',
      //       measurement: '-'
      //     },
      //     {
      //       name: 'sausage',
      //       amount: '1',
      //       measurement: 'lbs'
      //     },
      //     {
      //       name: 'ground beef',
      //       amount: '0.75',
      //       measurement: 'lbs'
      //     },
      //     {
      //       name: 'medium onion',
      //       amount: '1',
      //       measurement: '-'
      //     },
      //     {
      //       name: 'minced garlic',
      //       amount: '3',
      //       measurement: 'cloves'
      //     },
      //     {
      //       name: 'tomato paste',
      //       amount: '43',
      //       measurement: 'oz'
      //     },
      //     {
      //       name: 'water',
      //       amount: '0.66',
      //       measurement: 'cup'
      //     },
      //     {
      //       name: 'sugar',
      //       amount: '2',
      //       measurement: 'tbsp'
      //     },
      //     {
      //       name: 'basil',
      //       amount: '2',
      //       measurement: 'tsp'
      //     },
      //     {
      //       name: 'salt',
      //       amount: '0.75',
      //       measurement: 'tsp'
      //     },
      //     {
      //       name: 'egg',
      //       amount: '1',
      //       measurement: '-'
      //     },
      //     {
      //       name: 'ricotta cheese',
      //       amount: '15',
      //       measurement: 'oz'
      //     },
      //     {
      //       name: 'mozzarella cheese',
      //       amount: '4',
      //       measurement: 'cup'
      //     },
      //     {
      //       name: 'parmesan cheese',
      //       amount: '0.75',
      //       measurement: 'cup'
      //     }
      //   ],
      //   instructions: {
      //     instruction: [
      //       'Cook: sausage + beef + onion + garlic',
      //       'Drain',
      //       'Stir: tomatoes + tomato paste + water + sugar + parsley + basil + salt + pepper',
      //       'Boil: 30 minutes, stirring occasionally',
      //       'Mix: egg + ricotta cheese + parsley + salt',
      //       'Oven: 375 degrees F',
      //       'Spread 2 cups meat sauce into an ungreased 13x9-in. baking dish. Layer with three noodles and a third of the ricotta mixture. Sprinkle with 1 cup mozzarella cheese and 2 tablespoons Parmesan cheese. Repeat layers twice. Top with remaining meat sauce and cheeses',
      //       'Bake: 25 minutes'],
      //     notes: 'can add fennel'
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
      Vue.set(state.recipesObj, id, recipe)
    },
    REMOVE_RECIPE (state, { recipe }) {
      log('mutation REMOVE_RECIPE', recipe)
      const { id } = recipe
      Vue.delete(state.recipesObj, id)
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
      context.commit('ADD_RECIPE', { recipe })
    },
    removeRecipe (context, recipe) {
      context.commit('REMOVE_RECIPE', { recipe })
    },
    editRecipe (context, recipe) {
      context.commit('EDIT_RECIPE', { recipe })
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
