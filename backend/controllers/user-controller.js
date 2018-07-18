const Connector = require('../database/connector')

class UserController {
  constructor () {
    console.log('userController constructor called')
  }
  checkAndRegisterUser (req, res) {
    res.setHeader('Content-Type', 'application/json')
    
    const user = {
      id: '1',
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,      
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

    Connector.query(`SELECT email FROM Users`)
    .then(emails => {
      const allUSersEmails = []
      if (emails) {
        emails.forEach(element => {
          allUSersEmails.push(Object.values(element)[0])
        })
      }
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