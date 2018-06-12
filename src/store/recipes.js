'use strict'

// import debug from 'debug'
// let log = debug('store:recipes')
// import Vue from 'vue'

const recipes = {

  namespaced: true,

  state: {
    recipesObj: {
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
      },
      '003': {
        title: 'Cheesecake2',
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
      },
      '004': {
        title: 'Cupcakes2',
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
      }
    }
  },
  mutations: {

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
  }

}

export default recipes