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
            query(`SELECT * FROM ingredients WHERE recipe_id = '${recipe.id}'`)
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
    const recipe = req.body
    const { id } = recipe
    console.log(recipe, id)
    query("INSERT INTO `recipes` (id, title, fav, instructions, notes ) VALUES ('"+id+"' ,'"+recipe.title+"','" +recipe.fav+"', '"+recipe.instructions+"','"+recipe.notes+"')")
    .then(recipe => {
      console.log('recipe added')
    })
    .catch(error => {
      console.log(error)
      res.send({ error: 'Something bad happened', status: 500 })
    })
    recipe.ingredients.forEach((ingredient) => {
       query("INSERT INTO `ingredients` (recipe_id, name, amount, measurement) VALUES ('"+id+"','"+ingredient.name+"', '"+ingredient.amount+"', '"+ingredient.measurement+"')")
      .then(recipe => {
        console.log('ingredient added')
      })
      .catch(error => {
        console.log(error)
        res.send({ error: 'Something bad happened', status: 500 })
      })
    })
    res.send(recipe)
  }

  deleteRecipe (req, res) {
    res.setHeader('Content-Type', 'application/json')
    const recipeID = req.body
    // console.log(req.body, recipeID.id)
    query(`DELETE FROM recipes WHERE id = ` + recipeID.id)
    .then(recipe => {
      console.log('Recipe Removed!')
    })
    .catch(error => {
      console.log(error)
      res.send({ error: 'Something bad happened', status: 500 })
    })
    res.send(recipeID)
  }

  editRecipe (req, res) {
    res.setHeader('Content-Type', 'application/json')
    const recipe = req.body
    const { id } = recipe
    console.log(recipe.fav, id)
    query(`UPDATE recipes SET fav = 
      (CASE WHEN (fav = "true") THEN "false" 
            WHEN (fav = "false") THEN "true"
            ELSE fav
            END)
        WHERE id = ` + id)
    .then( recipe => {
      console.log('set to false')
    })
    .catch(error => {
      console.log(error)
    })
    res.send(recipe)
  }
}

module.exports = new RecipeController()