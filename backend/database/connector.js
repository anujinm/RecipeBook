const mysql      = require('mysql')
const connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : 'root',
  port: '3306',
  database : 'RecipeBook'
})

connection.connect()

module.exports = function query (queryString) {
  return new Promise((resolve, reject) => {
    connection.query(queryString, (error, results, fields) => {
      if (error) reject(error)
      resolve(results)
    })
  })
}

// connection.end()