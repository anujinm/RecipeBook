const query = require('../database/connector')

class RecipeController {
  constructor () {
    console.log('constructor called')
  }
  getRecipes (req, res) {
    const userQuery = req.body
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
      .then(results => {
        res.send(JSON.stringify({ results }))
      })
      .catch((error) => {
        console.log(error)
        res.send({ error: 'Something bad happened', status: 500 })
      })
  }
}

module.exports = new RecipeController()