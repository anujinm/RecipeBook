<template lang="pug">
  .welcome
    .row.justify-content-center.top
      .col-md-3.empty
      .col-md-4
        .message
          h3 Welcome to Anu's RecipeBook!
        .outerbox
          .email.row.justify-content-center
            .col-4
              label Email: 
            .col-6 
              input(ref="UserEmail")
          .password.row.justify-content-center
            .col-4
              label Password:
            .col-6
              input(ref="UserPassword" type="password")
          .row.justify-content-center(v-if="Errors.length")
            h6 {{ Errors[0] }}
          .row.justify-content-end
            button(@click="LoginValidator") Login
          .register
            h5 Don't have an account? 
              button(@click="$router.push('/register')") Sign up
</template>

<script>
// import session from '../../backend/index'
import jwt from 'jsonwebtoken'
import { mapState, mapActions } from 'vuex'
import debug from 'debug'
let log = debug('component:welcome')
export default {
  name: 'welcome',
  props: [],
  data () {
    return {
      Errors: []
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
      'login'
    ]),
    LoginValidator () {
      this.Errors = []
      const user = {
        email: this.$refs.UserEmail.value,
        password: this.$refs.UserPassword.value
      }
      // const jwt = require('jsonwebtoken')
      this.login({
        username: user.email,
        password: user.password
      })
      .then((response) => {
        if (response.data.error) {
          console.log(response)
          this.Errors.push('Invalid email or password')
        } else {
          this.Errors = []
          console.log(jwt.decode(response.data, { complete: true }).payload.id)
          this.redirect(true)
        }
      })
    },
    redirect (bool) {
      if (bool) {
        window.location.href = 'dashboard'
      }
    }
  }
}
</script>
<style scoped lang="scss">
@import "../styles/_variables";
@import "../styles/_mixins";
.welcome {
  // height: 1300px;
  .top {
    height: 910px;
    background-image: url("http://www.tokkoro.com/picsup/3065640-allium_aromatic_background_bear_bunch_cooking_eating_food_forest_fresh_garlic_green_healthy_herb_herbal_ingredient_isolated_kitchen_leaf_leek_onion_organic_plant_ramson_rope_sauce_seasoning_soup_.jpg");
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    .message {
      margin-top: 130px;
    }
    .outerbox {
      margin-top: 10%; 
      padding: 30px;
      width: 600px;
      height: 200px;
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
    .register {
      margin-top: 50px;
      button {
        cursor: pointer;
        color: black;
      }
    }
  }

  @media #{$tablet} {
    .top {
      .outerbox {
        width: 400px;
      }
      input {
        width: 200px;
      }
    }
  }

  @media #{$mobile} {
    .top {
      padding-left: 20px;
      .outerbox {
        width: 300px;
        height: 150px;
        font-size: 15px;
      }
      input { width: 150px;}
      .message {
        margin-top: 0px;
      }
      .register {
        button {margin-left: 50px;}
      }
    }
  }

}

</style>
