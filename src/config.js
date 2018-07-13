class Config {
  constructor (config) {
    this.detect()
    this.env = null
  }

  detect () {
    if (window.location.host === 'localhost') {
      this.env = 'dev'
    } else {
      this.env = 'prod'
    }
  }

  get baseURL () {
    return this.env === 'dev' ? 'http://localhost:3001' : 'http://ec2-34-217-133-50.us-west-2.compute.amazonaws.com:3001'
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
