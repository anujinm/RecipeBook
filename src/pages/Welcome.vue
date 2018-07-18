<template lang="pug">
  .welcome
    .row.justify-content-center.top
      .col-3
      .col-4
        .welcome
          h3 Welcome to Anu's RecipeBook!
        .outerbox
          .email.row.justify-content-center
            .col-4
              label Email: 
            .col-6 
              input 
          .password.row.justify-content-center
            .col-4
              label Password:
            .col-6
              input 
          .row.justify-content-end
            button Login
          .register
            h5 Don't have an account? 
              button(@click="$router.push('/register')") Sign up
</template>

<script>
import debug from 'debug'
let log = debug('component:welcome')
export default {
  name: 'welcome',
  props: [],
  data () {
    return {}
  },
  mounted: function () {
    log('Mounted')
  },
  computed: {
  },
  methods: {}
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
    .welcome {
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
}

</style>
