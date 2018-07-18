const Connector = require('../database/connector')
// const {User, validate} = require('../src/store/user')

class UserController {
  constructor () {
    console.log('userController constructor called')
  }

  checkAndRegisterUser (req, res) {
    res.setHeader('Content-Type', 'application/json')
    // const { error } = validate(req.body)
    // if (error) return res.status(400).send(error.details[0].message)
    
    // let user = await User.findOne({ email: req.body.email })
    // if (user) return res.status(400).send('User already registered.')
    
    const user = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,      
    }

    Connector.query("INSERT INTO Users (id, name, email, password) VALUES ('1', '"+user.name+"', '"+user.email+"', '"+user.password+"')")
    .then(user => {
      console.log('user added!!!')
      res.send(user)
    }).catch(error => {
      console.log(error)
      res.send({error: 'Error happened', status: 500})
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