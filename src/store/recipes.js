'use strict'

import debug from 'debug'
let log = debug('store:recipes')
import Vue from 'vue'

const recipes = {

  namespaced: true,

  state: {
    recipesObj: {
      '000': {
        title: 'Cookies',
        image: require('../../Cookies.png'),
        fav: true,
        ingredients: [
          {
            name: 'flour',
            amount: '1.5',
            measurement: 'cups'
          },
          {
            name: 'sugar',
            amount: '1',
            measurement: 'cup'
          },
          {
            name: 'vanilla extract',
            amount: '0.5',
            measurement: 'tsp'
          },
          {
            name: 'baking powder',
            amount: '1.25',
            measurement: 'tsp'
          },
          {
            name: 'unsulted butter',
            amount: '1',
            measurement: 'stick'
          },
          {
            name: 'whole milk',
            amount: '.66',
            measurement: 'cup'
          },
          {
            name: 'eggs',
            amount: '2',
            measurement: '-'
          }
        ],
        instructions: {
          instruction: [
            'Mix: Flour + sugar + baking powder + salt',
            'Add: butter + vanilla + eggs + milk',
            'Oven: 350 degrees Flour',
            'Bake: 20 minutes'],
          notes: 'Can add chocolate chips'
        }
      },
      '001': {
        title: 'Cupcakes',
        image: require('../../cupcake.png'),
        fav: false,
        ingredients: [
          {
            name: 'flour',
            amount: '1.5',
            measurement: 'cups'
          },
          {
            name: 'sugar',
            amount: '1',
            measurement: 'cup'
          },
          {
            name: 'vanilla extract',
            amount: '0.5',
            measurement: 'tsp'
          },
          {
            name: 'baking powder',
            amount: '1.25',
            measurement: 'tsp'
          },
          {
            name: 'unsulted butter',
            amount: '1',
            measurement: 'stick'
          },
          {
            name: 'whole milk',
            amount: '.66',
            measurement: 'cup'
          },
          {
            name: 'eggs',
            amount: '2',
            measurement: '-'
          }
        ],
        instructions: {
          instruction: [
            'Mix: Flour + sugar + baking powder + salt',
            'Add: butter + vanilla + eggs + milk',
            'Oven: 350 degrees Flour',
            'Bake: 20 minutes'],
          notes: 'Can add chocolate chips'
        }
      },
      '002': {
        title: 'Cheesecake with green tea',
        image: require('../../gtcheesecake.jpg'),
        fav: true,
        ingredients: [
          {
            name: 'graham cracker crumbs',
            amount: '1.75',
            measurement: 'cups'
          },
          {
            name: 'sugar',
            amount: '1.25',
            measurement: 'cup'
          },
          {
            name: 'vanilla extract',
            amount: '2',
            measurement: 'tsp'
          },
          {
            name: 'cream cheese',
            amount: '24',
            measurement: 'oz'
          },
          {
            name: 'unsulted butter',
            amount: '.33',
            measurement: 'stick'
          },
          {
            name: 'sour cream',
            amount: '1',
            measurement: 'cup'
          },
          {
            name: 'eggs',
            amount: '3',
            measurement: '-'
          }
        ],
        instructions: {
          instruction: [
            'Mix: Graham crumbs + butter + sugar',
            '9-inch springform pan',
            'Mix: cream cheese',
            'Add: vanilla + sour cream + eggs',
            'Oven: 350 degrees Flour',
            'Bake: 60-70 minutes'],
          notes: 'Can add macha'
        }
      },
      '003': {
        title: 'Cheesecake',
        image: require('../../cheesecake2.png'),
        fav: true,
        ingredients: [
          {
            name: 'graham cracker crumbs',
            amount: '1.75',
            measurement: 'cups'
          },
          {
            name: 'sugar',
            amount: '1.25',
            measurement: 'cup'
          },
          {
            name: 'vanilla extract',
            amount: '2',
            measurement: 'tsp'
          },
          {
            name: 'cream cheese',
            amount: '24',
            measurement: 'oz'
          },
          {
            name: 'unsulted butter',
            amount: '.33',
            measurement: 'stick'
          },
          {
            name: 'sour cream',
            amount: '1',
            measurement: 'cup'
          },
          {
            name: 'eggs',
            amount: '3',
            measurement: '-'
          }
        ],
        instructions: {
          instruction: [
            'Mix: Graham crumbs + butter + sugar',
            '9-inch springform pan',
            'Mix: cream cheese',
            'Add: vanilla + sour cream + eggs',
            'Oven: 350 degrees Flour',
            'Bake: 60-70 minutes'],
          notes: 'Can add macha'
        }
      }
    }
  },
  mutations: {
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
    addRecipe (context, recipe) {
      context.commit('ADD_RECIPE', { recipe })
    }
  }

}

export default recipes
