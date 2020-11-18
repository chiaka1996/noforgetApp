<template>
  <div id="signup_page">
    <div v-if="!loggedIn">
     <div class="register_header"><h1>Register</h1></div>

     <div class='error_messages'>
        <ul>
          <li v-for="(msg, index) in error_message" :key="index">{{msg}}</li>
        </ul>
        {{success_mesage}}
      </div>
    <form>
     <div id="username_input">
    <label for="username">Username</label><br>
    <input type="text" v-model="signup_details.username" id="username" placeholder="chi24" required>
    </div>

    <div id="email_input">
    <label for="email">Email</label><br>
    <input type="email" v-model="signup_details.email" id="email" placeholder="chi@yahoo.com" required>
    </div>

    <div id="password_input">
    <label for="password">Password</label><br>
    <input type="password" v-model="signup_details.password" placeholder="password" id="password" required>
    </div>

    <div id="confirm_password_input">
    <label for="confirm_password">Confirm Password</label><br>
    <input type="password" v-model="confirmPassword" id="confirm_password" placeholder="chi@yahoo.com" required>
    </div>

    <button type="submit" :class='!btn_clicked ? "register_btn" : "disable_btn"' v-on:click="register_user">{{register_status}}</button>
    </form>
    <div class="login_account">
      <p>already have an account ? <router-link to="/login" id="login">Login</router-link> </p>
    </div>
    </div>
    <div v-if="loggedIn">
      you are already logged, proceed to your <span @click=" this.$router.push('/dashboard')">Dashboard</span>
    </div>
    </div>
</template>

<script>

import axios from 'axios'
import { mapActions } from 'vuex'
import {mapState} from 'vuex'

export default {

  name: 'signup_page',
  data () {
    return {
      signup_details: {
        username: '',
        email: '',
        password: ''
      },
      login_details: {
        email: '',
        password: ''
      },
      confirmPassword: '',
      error_message: [],
      success_mesage: '',
      usernameBoolean: 'chiboy',
      email_boolean: false,
      password_boolean: false,
      confirm_password_boolean: false,
      btn_clicked: false,
      register_status: 'Register'
    }
  },

  computed: {
    ...mapState([ 'userProfile', 'loggedIn'])
  },

  methods: {

     ...mapActions([ 
       'addUserProfile', 'checkUserLogin'
     ]),

    register_user (e) {
      e.preventDefault()
      this.btn_clicked = true
      this.register_status = "Loading..."
      this.error_message = []
      const { username, password, email } = this.signup_details
      const userRegex = /[a-z]+[0-9]*/gi

      if (!username || !password || !this.confirmPassword || !email) {
        return this.error_message.push('please fill all fileds')
      }

      if (!userRegex.test(username) || username.length < 3 || username.length > 7) {
        this.error_message.push('username should start with a letter, contain only letters and numbers, be between 3 & 7 characters')
      }

      if (password.length < 7) {
        this.error_message.push('password should be more than 7')
      }

      if (this.confirmPassword < 7 || this.confirmPassword !== password) {
        this.error_message.push('password and confirm password do not match')
      }

      if (this.error_message.length < 1) {
        axios.post('https://noforgetappbackend.herokuapp.com/apis/userProfile', this.signup_details)
          .then(
            (response) => {
              if (response.status === 200) {
                this.login_details.email = email
                this.login_details.password = password
                axios.post('https://noforgetappbackend.herokuapp.com/apis/userLogin', this.login_details)
                  .then(
                    (res) => {
                      this.addUserProfile(res.data)
                      this.checkUserLogin(true)
                      this.$router.push('/dashboard')

                    }
                  ).catch(() => alert('check your network connection'))
              }

              else {
                this.btn_clicked = false
                this.register_status = "Register"
                this.error_message = [...response.data.errorArray]
              }
            }
          ).catch(() => alert('check your network connection'))
      }
    }
  }

}

</script>

<style lang="scss" scoped>
#signup_page{
  margin-top: 30%;
  font-family: 'Fredoka One';
  margin-left: 0;
  margin-right: 0;
}

.error_messages {
  color: red;
  background-color: #FCE2E2;
  width: 95%;
  border-radius: 5px;
  margin-left: 2%;
  margin-right: 2%;
  font-size: 15px;
  ul{
    list-style-type: none;
  }
}

.register_header{
  text-align: center;
  h1{
  color: #33C7FF;
}
}

#password_input, #confirm_password_input, #email_input{
margin-top: 7%;
margin-bottom: 7%;
}

input{
  width: 93%;
  height: 43px;
  margin-left: 2%;
  margin-right: 2%;
  border-radius: 10px;
  border: 2px solid lightgray;
  font-family: 'Times New Roman', Times, serif;
}

label {
  font-size: 20px;
  margin-left: 2%;
  color: #33C7FF;
}

.register_btn {
  width: 40%;
  height: 35px;
  font-size: 20px;
  border: 3px solid lightgray;
  background-color: #33C7FF;;
  color: white;
  border-radius: 10px;
  margin-left: 2%;
  font-family: 'Fredoka One';
  cursor: pointer;
}

.disable_btn {
  width: 40%;
  height: 35px;
  font-size: 20px;
  border: 3px solid lightgray;
  background-color: #33C7FF;;
  color: white;
  border-radius: 10px;
  margin-left: 2%;
  font-family: 'Fredoka One';
   cursor: not-allowed;
  pointer-events: none;
}

.login_account {
  color: grey;
  margin-left: 2%;
}

#login {
  color: #33C7FF;
  text-decoration: none;
}

 @media only screen and (min-width: 720px) and (max-width: 1099px) {
   input{
  width: 93%;
  height: 70px;
  margin-left: 2%;
  margin-right: 2%;
  border-radius: 10px;
  border: 2px solid lightgray;
  font-family: 'Times New Roman', Times, serif;
}

label {
  font-size: 40px;
  margin-left: 2%;
  color: #33C7FF;
}

.register_btn {
  width: 40%;
  height: 55px;
  font-size: 30px;
  border: 3px solid lightgray;
  background-color: #33C7FF;;
  color: white;
  border-radius: 10px;
  margin-left: 2%;
  font-family: 'Fredoka One';
  cursor: pointer;
}

.login_account {
  color: grey;
  margin-left: 2%;
  font-size: 35px;
}
 }

 @media only screen and (min-width: 1100px) {
   #signup_page{
  margin-top: 7%;
  font-family: 'Fredoka One';
  margin-left: 20%;
  margin-right: 20%;
}
 }

</style>
