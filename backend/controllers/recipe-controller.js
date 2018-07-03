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
    /* eslint-disable */
    function guid() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000);
      }
      return s4() + s4() + s4();
    }
    /* eslint-enable */
    const id = guid()
    recipe.id = id
    // const { id } = recipe
    console.log(recipe, id)
    query("INSERT INTO `recipes` (id, title, fav, instructions, notes ) VALUES ('"+recipe.id+"' ,'"+recipe.title+"','" +recipe.fav+"', '"+recipe.instructions+"','"+recipe.notes+"')")
    .then(recipe => {
      console.log('recipe added')
    })
    .catch(error => {
      console.log(error)
      res.send({ error: 'Something bad happened', status: 500 })
    })
    
    recipe.ingredients.forEach((ingredient) => {
      query("INSERT INTO `All_Ingredients` (name) SELECT * FROM (SELECT '"+ingredient.name+"') AS tmp WHERE NOT EXISTS (SELECT name FROM All_Ingredients WHERE name = '"+ingredient.name+"') LIMIT 1 ")
      .then(recipe => {
        console.log('ingredient added!!!')
      })
      .catch(error => {
        console.log(error)
        res.send({ error: 'Something bad happened', status: 500 })
      })
    })
    recipe.ingredients.forEach((ingredient) => {
       query("INSERT INTO `ingredients` (recipe_id, ingr_id, name, amount, measurement) VALUES ('"+id+"', '1','"+ingredient.name+"', '"+ingredient.amount+"', '"+ingredient.measurement+"')")
      .then(recipe => {
        console.log('ingredient added')
      })
      .catch(error => {
        console.log(error)
        res.send({ error: 'Something bad happened', status: 500 })
      })
    })
    
    // recipe.ingredients.forEach((ingredient) => {
    //   query("UPDATE ingredients SET ingr_id = (SELECT)")
    // })

    res.send(recipe)
  }

  deleteRecipe (req, res) {
    res.setHeader('Content-Type', 'application/json')
    const recipeID = req.body
    // console.log(req.body, recipeID.id)
    query(`DELETE FROM recipes WHERE id = ` + recipeID.id.toString())
    .then(recipe => {
      console.log('Recipe Removed!')
    })
    .catch(error => {
      console.log(error)
      res.send({ error: 'Something bad happened', status: 500 })
    })
    // res.send(recipeID)
  }

  editRecipeFav (req, res) {
    res.setHeader('Content-Type', 'application/json')
    const recipe = req.body
    const { id } = recipe
    console.log(recipe.fav, id)
    query(`UPDATE recipes SET fav = 
      (CASE WHEN (fav = "true") THEN "false" 
            WHEN (fav = "false") THEN "true"
            ELSE fav
            END)
        WHERE id = ` + id.toString())
    .then( recipe => {
      console.log('set to false')
    })
    .catch(error => {
      console.log(error)
    })
    res.send(recipe)
  }

  editRecipeIngr (req, res) {
    res.setHeader('Content-Type', 'application/json')
    const recipe = req.body
    const { id } = recipe
    console.log(recipe.fav, typeof(id.toString()))
    // Realized I actually don't need to update the db, so nothing to do here
    //
    // recipe.ingredients.forEach((ingredient) => {
    //   query("UPDATE ingredients SET amount = " + ingredient.amount + " WHERE recipe_id = " + id.toString())
    //   .then( recipe => {
    //     console.log('recipe ingredients updated', ingredient.amount)
    //   })
    //   .catch(error => {
    //     console.log(error)
    //   })
    // })
    res.send(recipe)
  }
  
}

module.exports = new RecipeController()