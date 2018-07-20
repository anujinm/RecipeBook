<template lang="pug">
  .register
    .row.justify-content-center
      .col-3
      .outerbox
        .fname.row.justify-content-center
          .col-4
            label Name: 
          .col-6 
            input(ref="newUserName") 
        .email.row.justify-content-center
          .col-4
            label Email: 
          .col-6 
            input(ref="newUserEmail") 
        .password.row.justify-content-center
          .col-4
            label Password:
          .col-6
            input(ref="newUserPassword" v-model="password")  
        .row.justify-content-center(v-if="Errors.length")
          h6(v-for="error in Errors") {{ error }}
        .row.justify-content-center(v-if="!Errors.length && Success")
          h5 Account successfully registered! You can login now.
        .row.justify-content-end
          button(@click="RegisterUser") Register
        .login
          h5 Already have an account? 
            button(@click="$router.push('/welcome')") Login
</template>

<script>
import { mapActions, mapState } from 'vuex'
import debug from 'debug'
const validator = require('email-validator')
// const passwordHash = require('password-hash')
let log = debug('component:register')
export default {
  name: 'register',
  props: [],
  data () {
    return {
      UserTaken: false,
      Errors: [],
      Success: false,
      password: ''
    }
  },
  mounted: function () {
    log('Mounted')
  },
  computed: {
    ...mapState('user', [
      'userObj'
    ])
  },
  methods: {
    ...mapActions('user', [
      'validateUser'
    ]),
    RegisterUser () {
      this.UserTaken = false
      this.Errors = []
      this.Success = false
      // const mypass = passwordHash.generate(this.$refs.newUserPassword.value)
      // console.log(mypass)
      const user = {
        name: this.$refs.newUserName.value,
        email: this.$refs.newUserEmail.value,
        password: this.password
      }
      // log errors
      if (user.name.length < 5) {
        this.Errors.push('Username must be at least 5 characters.')
      }
      if (user.password.length < 6) {
        this.Errors.push('Password must be at least 6 characters.')
      }
      if (!user.email) {
        this.Errors.push('Email required.')
      } else if (!validator.validate(user.email)) {
        this.Errors.push('Valid email required.')
      }
      // If email is already registered
      Object.keys(this.userObj).forEach(element => {
        if (this.userObj[element].email === user.email) {
          this.UserTaken = true
          this.Errors.push('This email is taken.')
        }
      })
      // register if no errors
      if (!this.Errors.length) {
        this.validateUser(user)
        this.Success = true
      }
    }
  }
}
</script>
<style scoped lang="scss">
@import "../styles/_variables";
@import "../styles/_mixins";
.register {
  height: 910px;
  background-image: url("http://www.tokkoro.com/picsup/3065640-allium_aromatic_background_bear_bunch_cooking_eating_food_forest_fresh_garlic_green_healthy_herb_herbal_ingredient_isolated_kitchen_leaf_leek_onion_organic_plant_ramson_rope_sauce_seasoning_soup_.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  .outerbox {
    margin-top: 10%; 
    padding: 30px;
    width: 600px;
    height: 290px;
    text-align: center;
    box-shadow: 0px 0px 8px $gray10;
    border-radius: 5px;
    font-size: 25px;
    color: rgb(31, 30, 30);
    font-weight: 400;
    .col-4 {
      text-align: left;
    }
  }
  input {
    // outline: none;
    border-radius: 5px;
    margin-bottom: 10px;
    border: 1px solid ;
    background: transparent;
  }
  h6 {
    font-size: 16px;
    // display: inline-block;
    &::before { content: '*'; color: red; font-weight: bold;}
  }
  button {
    background: transparent;
    box-shadow: 1px 1px 4px $gray10;
    outline: none;
    border-radius: 5px;
    width: 130px;
    margin-top: 20px;
    margin-right: 80px;
    font-weight: 200;
    cursor: pointer;
  }
  .login {
    margin-top: 70px;
  }
}

</style>
