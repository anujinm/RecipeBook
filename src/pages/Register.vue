<template lang="pug">
  .register
    .row.justify-content-center
      .outerbox
        .fname.row.justify-content-center
          .col-4
            label First Name: 
          .col-6 
            input 
        .lname.row.justify-content-center
          .col-4
            label Last Name: 
          .col-6 
            input 
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
          button Register

</template>

<script>
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
  methods: {}
}
</script>
<style scoped lang="scss">
@import "../styles/_variables";
@import "../styles/_mixins";
.register {
  height: 910px;
  background-image: url("http://backgroundcheckall.com/wp-content/uploads/2017/12/cooking-background-images-13.jpg");
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
}

</style>
