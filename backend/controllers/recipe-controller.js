const Connector = require('../database/connector')
const jwt = require('jsonwebtoken')

class RecipeController {
  constructor () {
    console.log('RecipeController constructor called')
  }
    
  getAllIngredients (req, res) {
    res.setHeader('Content-Type', 'application/json')
    Connector.query(`SELECT name FROM All_Ingredients`)
    .then(results => {
      const ingrList = []
      if (results) {
        results.forEach((item) => {
          ingrList.push(Object.values(item)[0])
        })
      }
      res.send(JSON.stringify(ingrList))
    })
    .catch((error) => {
      console.log(error, res.data)
      res.send( { error: 'Something bad happened', status: 500 })
    })
  }

  getShoppingList (req, res) {
    res.setHeader('Content-Type', 'application/json')

    const token = req.headers.authorization
    const userID = jwt.decode(token, { complete: true }).payload.id
    console.log('userID: ', userID)

    Connector.query(`SELECT ingredient_name FROM shopping_list WHERE user_id = ${userID}`)
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
      console.log(error, res.data)
      res.send( { error: 'Something bad happened', status: 500 })
    })
  }
  
  getRecipes (req, res) {
    // Connector.query(`SELECT * FROM recipes WHERE id = "${userQuery.id}"`)
    res.setHeader('Content-Type', 'application/json')
    // get the user ID
    const token = req.headers.authorization
    const userID = jwt.decode(token, { complete: true }).payload.id
    console.log('userID: ', userID)

    Connector.query(`SELECT * FROM recipes WHERE user_id = ${userID}`)
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
            Connector.query(`SELECT * FROM ingredients WHERE recipe_id = '${recipe.id}'`)
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

    //get user ID
    const token = req.headers.authorization
    const userID = jwt.decode(token, { complete: true }).payload.id

    Connector.query("INSERT INTO `recipes` (id, user_id, title, fav, instructions, notes ) VALUES ('"+recipe.id+"', '"+userID+"', '"+recipe.title+"','" +recipe.fav+"', '"+recipe.instructions+"','"+recipe.notes+"')")
    .then(recipe => {
      console.log('recipe added')
    })
    .catch(error => {
      console.log(error)
      res.send({ error: 'Something bad happened', status: 500 })
    })
    
    recipe.ingredients.forEach((ingredient) => {
      Connector.query("INSERT INTO `All_Ingredients` (name) SELECT * FROM (SELECT '"+ingredient.name+"') AS tmp WHERE NOT EXISTS (SELECT name FROM All_Ingredients WHERE name = '"+ingredient.name+"') LIMIT 1 ")
      .then(recipe => {
        console.log('ingredient added!!!')
      })
      .catch(error => {
        console.log(error)
        res.send({ error: 'Something bad happened', status: 500 })
      })
    })
    recipe.ingredients.forEach((ingredient) => {
       Connector.query("INSERT INTO `ingredients` (recipe_id, ingr_id, name, amount, measurement) VALUES ('"+id+"', '1','"+ingredient.name+"', '"+ingredient.amount+"', '"+ingredient.measurement+"')")
      .then(recipe => {
        console.log('ingredient added')
      })
      .catch(error => {
        console.log(error)
        res.send({ error: 'Something bad happened', status: 500 })
      })
    })

    recipe.ingredients.forEach((ingredient) => {
      Connector.query(`UPDATE ingredients
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
    console.log(req.body, recipeID.id)

    Promise.all([
      Connector.query(`DELETE FROM ingredients WHERE recipe_id = ` + recipeID.id.toString())
      .then(recipe => {
        console.log('recipe_id removed from ingredients!')
      })
      .then(() =>{
        
      }),
      Connector.query(`DELETE FROM recipes WHERE id = ` + recipeID.id.toString())
      .then(recipe => {
        console.log('Recipe Removed!')
      })
      .catch(error => {
        console.log(error)
        res.send({ error: 'Something bad happened', status: 500 })
      })
    ]).then(() => {
      res.send({ recipeID, status: 200 })
    }).catch(error => {
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
    Connector.query(`UPDATE recipes SET fav = 
      (CASE WHEN (fav = "true") THEN "false" 
            WHEN (fav = "false") THEN "true"
            ELSE fav
            END)
        WHERE id = ` + id.toString())
    .then( recipe => {
      console.log('fav changed')
    })
    .catch(error => {
      console.log(error)
    })
    res.send(recipe)
  }

  addItemToShoppingList (req, res) {
    res.setHeader('Content-Type', 'application/json')
    const item = Object.keys(req.body)[0].toString()
    console.log(item)

    const token = req.headers.authorization
    console.log(token)
    const userID = jwt.decode(token, { complete: true }).payload.id
    console.log('userID: ', userID)

    Promise.all([
      Connector.query("INSERT INTO shopping_list (ingredient_id, ingredient_name, user_id) VALUES (1,'"+item+"', '"+userID+"')")
      .then(item => {
        console.log('Item added to Shopping List with id 1 and name!')
      })
      .then(() => {
        
      }),
      Connector.query("INSERT INTO `All_Ingredients` (name) SELECT * FROM (SELECT '"+item+"') AS tmp WHERE NOT EXISTS (SELECT name FROM All_Ingredients WHERE name = '"+item+"') LIMIT 1 ")
      .then(recipe => {
        console.log('ingredient added to All_Ingredients')
      })
      .catch(error => {
        console.log(error)
        res.send({ error: 'Something bad happened', status: 500 })
      }),
      Connector.query("UPDATE shopping_list INNER JOIN All_Ingredients ON ingredient_name = All_Ingredients.name SET shopping_list.ingredient_id = All_Ingredients.id")
      .then(item => {
        console.log('Item id updated!')
      })
      .catch(error => {
        console.log(error)
        res.send({ error: 'Something bad happened', status: 500 })
      })
    ]).then(() => {
      res.send({ item, status: 200 })
    }).catch(() => {
      console.log(error)
      res.send({ error: 'Something bad happened', status: 500 })
    })
  }

  deleteItemFromShoppingList (req, res) {
    res.setHeader('Content-Type', 'application/json')
    const item = Object.values(req.body)[0]
    console.log(item)
    Connector.query("DELETE FROM shopping_list WHERE ingredient_name = '" + item + "'")
    .then(item => {
      console.log('Item removed.')
      res.send(item)
    })
    .catch(error => {
      console.log(error)
      res.send({ error: 'Something bad happened', status: 500 })
    })
  }
  
}

module.exports = new RecipeController()