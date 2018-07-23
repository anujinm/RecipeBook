const express = require('express')
const Connector = require('./database/connector')
const bodyParser = require('body-parser')
const cors = require('cors')
const RecipeController = require('./controllers/recipe-controller')
const UserController = require('./controllers/user-controller')
const session = require('client-sessions')

const app = express()
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
// allow requests from any domain
app.use(cors())

//user login authentication
app.use(session({
  cookieName: 'session',
  secret: 'eg[isfd-8yF9-7w2315df{}+Ijsli;;to8',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
  httpOnly: true,
  secure: true,
  ephemeral: true
}))

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
// app.get('/users', UserController.getUserName)
app.post('/login', UserController.authenticateUser)
// start app
const port = 3001
console.log(`app is listening on port ${port}`)
app.listen(port)