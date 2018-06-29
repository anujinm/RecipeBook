const query = require('../database/connector')

class RecipeController {
  constructor () {
    console.log('constructor called')
  }
  getRecipes (req, res) {
    // query(`SELECT * FROM recipes WHERE id = "${userQuery.id}"`)
    res.setHeader('Content-Type', 'application/json')
    query(`SELECT * FROM recipes`)
      .then(recipeResults => {
        const recipes = []
        if (recipeResults) {
          let resolveCount = 0

          // resovler function that serializes the async actions
          const resolver = () => {
            resolveCount += 1
            if (resolveCount >= recipeResults.length) {
              // send the final results if we've gotten everything
              res.send(JSON.stringify({ recipes }))
            }
          }

          // for every recipe, grab some extra data
          recipeResults.forEach((recipe) => {
            // query to get all of the recipe's ingredients
            query(`SELECT * FROM ingredients WHERE recipe_id = ${recipe.id}`)
            .then(ingredientList => {
              recipe.ingredients = ingredientList
              recipes.push(recipe)
              // check to make sure we're done
              resolver()
            }).catch(error => {
              // even if there's an error, we have to resolve the funtion eventually
              console.log(error)
              resolver()
            })
          })
        }
      })
      .catch((error) => {
        console.log(error)
        res.send({ error: 'Something bad happened', status: 500 })
    })
  }
  postRecipe (req, res) {
    res.setHeader('Content-Type', 'application/json')
    // const recipe = theRecipe(req.body)
    // has to be the recipe i'm adding. How to get it?
    // let recipe = {
    //   id: 100,
    //   title: 'new Recipe',
    //   fav: false,
    //   ingredients: [],
    //   instructions: 'instructions',
    //   notes: 'no notes'
    // }
    // recipe.save()
    // .then(recipe => {
    //   res.send.JSON({'recipe':'recipe added'})
    // }).catch(error => {
    //   console.log(error)
    // })

  }
}

module.exports = new RecipeController()