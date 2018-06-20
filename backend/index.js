const express = require('express')
const query = require('./database/connector')
const bodyParser = require('body-parser')

const app = express()
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.post('/test', (req, res) => {
  const userQuery = req.body
  res.setHeader('Content-Type', 'application/json')
  query(`SELECT * FROM recipes WHERE name = "${userQuery.name}"`)
    .then(results => {
      res.send(JSON.stringify({ results }))
    })
    .catch((error) => {
      console.log(error)
    })
})
const port = 3000
console.log(`app is listening on port ${port}`)
app.listen(port)