class Config {
  constructor (config) {
    this.env = null
    this.detect()
  }

  detect () {
    if (window.location.host.indexOf('localhost') !== -1) {
      this.env = 'dev'
    } else {
      this.env = 'prod'
    }
    console.log(window.location.host, this.env)
  }

  get baseURL () {
    const base = this.env === 'dev' ? 'http://localhost:3001' : 'http://ec2-34-217-133-50.us-west-2.compute.amazonaws.com:3001'
    return base
  }

  get recipeURL () {
    return `${this.baseURL}/recipes`
  }

  get shoppingListURL () {
    return `${this.baseURL}/shoppinglist`
  }

  get allIngredientsURL () {
    return `${this.baseURL}/allingredients`
  }
}

export default new Config()
