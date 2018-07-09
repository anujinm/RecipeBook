const query = require('../database/connector')

class RecipeController {
  constructor () {
    console.log('constructor called')
  }

  getShoppingList (req, res) {
    res.setHeader('Content-Type', 'application/json')
    query(`SELECT ingredient_name FROM shopping_list`)
    .then(results => {
      const shoppingList = []
      if (results) {
        results.forEach((item) => {
          shoppingList.push(Object.values(item)[0])
        })
      }
      res.send(JSON.stringify(shoppingList))
    })
    .catch((error) => {
      console.log(error, response.data)
      res.send( { error: 'Something bad happened', status: 500 })
    })
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

  // getSearchedRecipes (req, res) {
  //   res.setHeader('Content-Type', 'application/json')

  //   query(`SELECT * FROM All_Ingredients WHERE `)
  // }

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

    recipe.ingredients.forEach((ingredient) => {
      // query("UPDATE ingredients SET ingr_id = (SELECT id FROM All_Ingredients WHERE name = name)")
      query(`UPDATE ingredients
              INNER JOIN All_Ingredients ON ingredients.name = All_Ingredients.name
              SET ingredients.ingr_id = All_Ingredients.id`)
      .then(recipe => {
        console.log('ingredient id added')
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
    query(`DELETE FROM ingredients WHERE recipe_id = ` + recipeID.id.toString())
    .then(recipe => {
      console.log('Recipe Removed!')
    })
    .catch(error => {
      console.log(error)
      res.send({ error: 'Something bad happened', status: 500 })
    })

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

  // editRecipeIngr (req, res) {
  //   res.setHeader('Content-Type', 'application/json')
  //   const recipe = req.body
  //   const { id } = recipe
  //   console.log(recipe.fav, typeof(id.toString()))
  //   // Realized I actually don't need to update the db, so nothing to do here

  //   /* recipe.ingredients.forEach((ingredient) => {
  //      query("UPDATE ingredients SET amount = " + ingredient.amount + " WHERE recipe_id = " + id.toString())
  //      .then( recipe => {
  //        console.log('recipe ingredients updated', ingredient.amount)
  //      })
  //      .catch(error => {
  //       console.log(error)
  //      })
  //    }) */
  //   res.send(recipe)
  // }

  addItemToShoppingList (req, res) {
    res.setHeader('Content-Type', 'application/json')
    const item = Object.keys(req.body)[0].toString()
    console.log(item)
    query("INSERT INTO shopping_list (ingredient_id, ingredient_name) VALUES (1,'"+item+"')")
    .then(item => {
      console.log('Item added to Shopping List with id 1 and name!')
    })
    .catch(error => {
      console.log(error)
      res.send({ error: 'Something bad happened', status: 500 })
    })

    query("INSERT INTO `All_Ingredients` (name) SELECT * FROM (SELECT '"+item+"') AS tmp WHERE NOT EXISTS (SELECT name FROM All_Ingredients WHERE name = '"+item+"') LIMIT 1 ")
    .then(recipe => {
      console.log('ingredient added!!!')
    })
    .catch(error => {
      console.log(error)
      res.send({ error: 'Something bad happened', status: 500 })
    })

    query("UPDATE shopping_list INNER JOIN All_Ingredients ON ingredient_name = All_Ingredients.name SET shopping_list.ingredient_id = All_Ingredients.id")
    .then(item => {
      console.log('Item id updated!')
    })
    .catch(error => {
      console.log(error)
      res.send({ error: 'Something bad happened', status: 500 })
    })
  }

  deleteItemFromShoppingList (req, res) {
    res.setHeader('Content-Type', 'application/json')
    const item = Object.values(req.body)[0]
    console.log(item)
    query("DELETE FROM shopping_list WHERE ingredient_name = '" + item + "'")
    .then(item => {
      console.log('Item removed.')
    })
    .catch(error => {
      console.log(error)
      res.send({ error: 'Something bad happened', status: 500 })
    })
  }
  
}

module.exports = new RecipeController()