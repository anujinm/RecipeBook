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
            input(ref="newUserPassword")  
        .row.justify-content-end
          button(@click="RegisterUser") Register
        .login
          h5 Already have an account? 
            button(@click="$router.push('/welcome')") Login
</template>

<script>
import {mapActions} from 'vuex'
import debug from 'debug'
let log = debug('component:register')
export default {
  name: 'register',
  props: [],
  data () {
    return {}
  },
  mounted: function () {
    log('Mounted')
  },
  computed: {
  },
  methods: {
    ...mapActions('user', [
      'validateUser'
    ]),
    RegisterUser () {
      const user = {
        name: this.$refs.name,
        email: this.$refs.email,
        password: this.$refs.password
      }
      this.validateUser(user)
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
