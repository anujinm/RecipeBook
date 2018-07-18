const mysql = require('mysql')

class Connector {
  constructor () {
    this.connecting = false
    this.connected = false
    this.disconnectTimeout = null
    this.connectQueue = []
    this.connectionError = ''
  }

  connect (onConnect) {
    // If we're on a timed disconnect, cancel that
    if (this.disconnectTimeout) {
      clearTimeout(this.disconnectTimeout)
    }
    // Connect to the database here
    // If we're already connecting, any other attempts to connect will
    // resolve at the same time because of the connect queue
    if (this.connecting) {
      this.connectQueue.push(onConnect)
    }
    // If we're already connected, don't try to reconnect
    if (this.connected) {
      console.log('already connected')
      if (typeof onConnect === 'function') {
        onConnect()
      }
    } else {
      console.log('starting new connection')
      // Otherwise, start a new connection
      this.connection = mysql.createConnection({
        // host     : 'anurecipebook.c7kr3tzyksyk.us-west-2.rds.amazonaws.com',
        host     : 'anurecipebook-db.c7kr3tzyksyk.us-west-2.rds.amazonaws.com',
        user     : 'anujinm',
        password : 'Shine*3911',
        port: '3306',
        database : 'RecipeBook',
        timeout: 60000
      })
      this.connection.connect((err) => {
        console.log(err)
        if (err) {
          this.connected = false
          this.connectionError = err
        }
        this.connectQueue.push(onConnect)
        for (let i = 0; i < this.connectQueue.length; i++) {
          const resolve = this.connectQueue.shift()
          if (typeof resolve === 'function') {
            resolve()
          }
        }
        this.connected = true
      })
    }
  }

  disconnect () {
    if (this.connection) {
      this.connection.end()
      this.connection = null
      this.connected = false
    }
  }

  timedDisconnect () {
    this.disconnectTimeout = setTimeout(() => {
      this.disconnect()
    }, 30 * 1000)
  }

  query (queryString) {
    return new Promise((resolve, reject) => {
      if (this.connectionError === '') {
        this.connect(() => {
          this.connection.query(queryString, (error, results, fields) => {
            if (error) reject(error)
            resolve(results)
            this.timedDisconnect()
          })
        })
      } else {
        reject(this.connectionError)
      }
    })
  }
}

module.exports = new Connector()