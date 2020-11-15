<template>
  <div class="home">
    <div class="svg-image">
      <img src="https://res.cloudinary.com/chiaka1996/image/upload/v1602695925/noForgetHomeImage_coteka.png" alt="mark your calender" id="homepage_image" />
      </div>

      <div class="window_flex">
      <div class="plan_do_relax">PLAN. DO. RELAX</div>
      <div class="notes">no forget say; failure to plan na planning to fail</div>

      <div v-if="!loggedIn" class="home-buttons">
        <router-link to="/login"><button class="home_login_btn">Login</button> </router-link> <br/>
      <router-link to="/signup">  <button class="home_signup_btn">Signup</button> </router-link>
      </div>
      </div>

      <div class="svg-image-windows">
      <img src="https://res.cloudinary.com/chiaka1996/image/upload/v1602695925/noForgetHomeImage_coteka.png" alt="mark your calender" id="homepage_image" />
      </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Home',
  data () {
    return {

    }
  },


  computed: {
    ...mapState([
      'userProfile', 'loggedIn'
    ])
  },

}
</script>

<style lang="scss" scoped>
.home {
  margin-top: 30%;
}

  #homepage_image{
    width: 100%;
    height: 100%;
  }

  .plan_do_relax{
    color:  #33C7FF;
    font-size: 35px;
    font-weight: bold;
    text-align: center;
  }

  .notes{
    color:  grey;
    font-size: 13px;
    font-weight: bold;
    text-align: center;
  }

  .home-buttons {
    text-align: center;
    width: 100%;
    position: fixed;
    bottom: 0;
  }

  .home_login_btn {
    width: 97%;
    height: 45px;
    font-size: 18px;
    font-weight: bold;
    background-color: #33C7FF;
    border-radius: 10px;
    color: white;
    margin-bottom: 3%;
    border: 1px solid  #33C7FF;
    cursor: pointer;
  }

  .home_signup_btn{
     width: 97%;
    height: 45px;
    font-size: 18px;
    font-weight: bold;
    background-color: #9DA4A7;
    border-radius: 10px;
    color: white;
    border: #9DA4A7;
    cursor: pointer;
  }

  .svg-image-windows {
    display: none;
  }

  .svg-image {
    display: block;
  }

  //surface duo and ipad
   @media only screen and (min-width: 510px) {
   .home {
  margin-top: 7%;
  
}

  @media only screen and (min-width: 760px) and (max-width: 1050px) {
    .plan_do_relax{
    color:  #33C7FF;
    font-size: 70px;
    font-weight: bold;
    text-align: center;
  }

  .notes{
    color:  rgb(54, 50, 50);
    font-size: 22px;
    font-weight: bold;
    text-align: center;
  }

    .home_login_btn {
    height: 65px;
  }

  .home_signup_btn{
    height: 65px;
  }

  }
   }

  //desktop view 
 @media only screen and (min-width: 1051px) {
   .home {
  margin-top: 7%;
  display: grid;
  grid-template-columns: 50% 50%;
}

.svg-image-windows {
    display: block;
  }

  .svg-image {
    display: none;
  }

  .window_flex {
    margin-top: 17%;
    width: 100%;
  }

  .home-buttons {
    text-align: center;
    width: 100%;
    margin-top: 18%;
    position: relative;
    bottom: 0;
  }


 }

</style>
