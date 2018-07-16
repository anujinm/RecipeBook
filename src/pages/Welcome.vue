<template lang="pug">
  .welcome
    .row.justify-content-start.top
      .col-1
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
    .bottom
      .img

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
  height: 1300px;
  .top {
    height: 560px;
    background-image: url("http://backgroundcheckall.com/wp-content/uploads/2017/12/cooking-background-images-13.jpg");
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    // animation: slide 6s linear infinite;
    
    // @keyframes slide {
    //   0%{
    //     transform: translate3d(0,0,0);
    //   }
    //   100%{
    //     transform: translate3d(0, -500px,0);
    //   }
    // }

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
  }

  .bottom {
    background: rgb(145, 97, 43);
    height: 680px;
    padding: 40px;
    .img {
      // margin: 40px;
      height: 600px;
      background-image: url("https://preview.ibb.co/kxpSPJ/ssrecipes.png");
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
    }
  }
}

</style>
