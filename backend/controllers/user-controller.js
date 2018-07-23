const Connector = require('../database/connector')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

class UserController {
  constructor () {
    console.log('userController constructor called')
  }
  checkAndRegisterUser (req, res) {
    res.setHeader('Content-Type', 'application/json')

    const { name, email, password } = req.body
    
    const user = {
      id: '1',
      name,
      email,
      password: bcrypt.hashSync(password, 10)      
    }
    /* eslint-disable */
    function guid() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000);
      }
      return s4() + s4() + s4();
    }
    /* eslint-enable */
    const id = guid()
    user.id = id
    // get all emails from db and check if given email already exists 
    Connector.query(`SELECT email FROM Users`)
    .then(emails => {
      const allUSersEmails = []
      if (emails) {
        emails.forEach(element => {
          allUSersEmails.push(Object.values(element)[0])
        })
      }
      // add user if not found in db
      if (!allUSersEmails.includes(user.email)) {
        Connector.query("INSERT INTO Users (name, email, password) VALUES ('"+user.name+"', '"+user.email+"', '"+user.password+"')")
        .then(user => {
          console.log('new user successfully added')
          res.send(user)
        }).catch(error => {
          console.log(error)
          res.send({error: 'Could not add user', status: 500})
        })
      } else {
        res.send('Email is taken!')
      }
    }).catch((error) => {
      res.send( { error: 'Something bad happened', status: 500 })
    })
  }

  authenticateUser (req, res) {
    res.setHeader('Content-Type', 'application/json')
    const { username, password } = req.body
    const userQuery = `SELECT * FROM Users WHERE email = "${username}";`
    Connector.query(userQuery)
      .then(users => {
        if (users.length === 0) {
          res.send({ error: 'Invalid username or password' })  
        } else {
          const user = users[0]
          const isValid = bcrypt.compareSync(password, user.password)
          if (isValid) {
            const token = jwt.sign({ id: users[0].id }, 'jwtPrivateKey')
            res.send(token)
          } else {
            res.send({ error: 'Invalid username or password' })
          }
        }
      })
      .catch(err => {
        res.send({ error: 'Something went wrong', status: 500 })
      })
  }

  getAllUsers (req, res) {
    res.setHeader('Content-Type', 'application/json')
    Connector.query(`SELECT * FROM Users`)
    .then(users => {
      console.log('got the users')
      res.send(users)
    }).catch(error => {
      console.log(error)
      res.send({error: 'Error happened', status: 500})
    })
  }
}

module.exports = new UserController()