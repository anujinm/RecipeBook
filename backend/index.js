const express = require('express')
const Connector = require('./database/connector')
const bodyParser = require('body-parser')
const cors = require('cors')
const RecipeController = require('./controllers/recipe-controller')
const UserController = require('./controllers/user-controller')

const app = express()
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
// allow requests from any domain
app.use(cors())

// routes
app.get('/allingredients', RecipeController.getAllIngredients)
app.get('/recipes', RecipeController.getRecipes)
app.post('/recipes', RecipeController.postRecipe)
app.delete('/recipes', RecipeController.deleteRecipe)
app.put('/recipes/fav', RecipeController.editRecipeFav)
// app.put('/recipes/ingr', RecipeController.editRecipeIngr)
app.get('/shoppinglist', RecipeController.getShoppingList)
app.post('/shoppinglist', RecipeController.addItemToShoppingList)
app.delete('/shoppinglist', RecipeController.deleteItemFromShoppingList)
app.post('/users', UserController.checkAndRegisterUser)
app.get('/users', UserController.getAllUsers)
// start app
const port = 3001
console.log(`app is listening on port ${port}`)
app.listen(port)