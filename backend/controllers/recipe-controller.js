const query = require('../database/connector')

class RecipeController {
  constructor () {
    console.log('constructor called')
  }
  getRecipes (req, res) {
    // res.setHeader('Content-Type', 'application/json')
    // query(`SELECT * FROM recipes WHERE id = "${userQuery.id}"`)
    //   .then(results => {
    //     res.send(JSON.stringify({ results }))
    //   })
    //   .catch((error) => {
    //     console.log(error)
    //   })
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
}

module.exports = new RecipeController()