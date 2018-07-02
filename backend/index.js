const express = require('express')
const query = require('./database/connector')
const bodyParser = require('body-parser')
const cors = require('cors')
const RecipeController = require('./controllers/recipe-controller')

const app = express()
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
// allow requests from any domain
app.use(cors())

// routes
app.get('/recipes', RecipeController.getRecipes)
app.post('/recipes', RecipeController.postRecipe)
app.delete('/recipes', RecipeController.deleteRecipe)
app.put('/recipes', RecipeController.editRecipe)

// start app
const port = 3001
console.log(`app is listening on port ${port}`)
app.listen(port)