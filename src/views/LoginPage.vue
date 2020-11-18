<template>
  <div id="login_page">
    <div v-if="!loggedIn">
    <div class="login_header"><h1>login</h1></div>

     <div class='error_messages'>
        <ul>
          <li v-for="(msg, index) in error_message" :key="index">{{msg}}</li>
        </ul>
      </div>

    <form>
    <div id="email_input">
    <label for="email">Email</label><br>
    <input type="email" v-model='login_details.email' id="email" placeholder="chi@yahoo.com">
    </div>

    <div id="password_input">
    <label for="password">Password</label><br>
    <input type="password" v-model='login_details.password' placeholder="password" id="password">
    <div class="forgot_password"><span @click="forgotpasswword_link" to="/forgotpassword" id="forgot">Forgot Password ?</span> </div>
    </div>

    <button :class="!btn_clicked ? 'login_btn':'disable_btn'" @click="login_user">{{login_status}}</button>
   


    </form>

    <div class="register_account">
      <p>don't have an account ? <router-link to="/signup" id="register">register</router-link> </p>
    </div>
    </div>
    <div v-if="loggedIn">
      you are already logged in. proceed to your <span @click="dashboard_link">dashboard</span>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex'
import {mapState} from 'vuex'
export default {
  name: 'login_page',
  data () {
    return {
      login_details: {
        email: '',
        password: ''
      },
      error_message: [],
      success_message: '',
      btn_clicked: false,
      login_status: 'Login'
    }
  },

  mounted() {
    this.btn_clicked = false
    this.login_status = 'Login'
    
  },

  // watch: {
  //   error_message: (val) => {
  //     this.login_status = val
  //   }
  // },

  computed: {
     ...mapState([ 'userProfile', 'loggedIn'])
  },

  methods: {
     ...mapActions([ 
       'addUserProfile', 'checkUserLogin'
     ]),

     dashboard_link () {
        this.$router.push('/dashboard')
     },

    profile_link () {
       this.$router.push('/profile')
    },

    forgotpasswword_link () {
        this.$router.push('/forgotpassword')
    },

    sigunp_link () {
       this.$router.push('/signup')
    },

    login_user (e) {
      e.preventDefault()
      this.login_status = "Loading..."
      this.btn_clicked = true
      this.error_message = []
      const { password } = this.login_details
      if (password.length < 7) {
        this.error_message.push('password should be 7 or more characters')
      }

      else {
        axios.post('https://noforgetappbackend.herokuapp.com/apis/userLogin', this.login_details)
          .then(
            (res) => {
              
              if (res.status === 201) {
                this.btn_clicked = false
                this.login_status = "Login"
                this.error_message.push(res.data.message)
              }

              if (res.status === 200) {
                  this.addUserProfile(res.data)
                  this.checkUserLogin(true)
                   this.$router.push('/dashboard')

              }
            }
          ).catch(() => alert('check your network connection'))
      }
    }
  }

}
</script>

<style lang="scss" scoped>

#login_page{
  margin-top: 50%;
   font-family: 'Fredoka One';
   margin-left: 0;
   margin-right: 0;
}

.login_header{
  text-align: center;
  h1{
  color: #33C7FF;
}
}

.error_messages {
  color: red;
  background-color: #FCE2E2;
  width: 95%;
  border-radius: 5px;
  margin-left: 2%;
  margin-right: 2%;
  font-size: 15px;
  ul {
    list-style-type: none;
  }
}

#password_input{
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
  font-family:'Times New Roman', Times, serif;
}

label {
  font-size: 20px;
  margin-left: 2%;
  color: #33C7FF;
}

.login_btn {
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

.register_account {
  color: grey;
  margin-left: 2%;
}

#register {
  color: #33C7FF;
  text-decoration: none;
  cursor: pointer;
}

.forgot_password {
  text-align: end;
  margin-right: 7%;
  color: red;
  cursor: pointer;

  #forgot {
    color: red;
  }
}

 @media only screen and (min-width: 720px) and (max-width: 1099px) {
   input{
  width: 93%;
  height: 70px;
  margin-left: 2%;
  margin-right: 2%;
  border-radius: 10px;
  border: 2px solid lightgray;
  font-family:'Times New Roman', Times, serif;
}

label {
  font-size: 40px;
  margin-left: 2%;
  color: #33C7FF;
}

.login_btn {
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

.register_account {
  color: grey;
  margin-left: 2%;
  font-size: 29px;
}
}

 @media only screen and (min-width: 1100px) {
   #login_page{
  margin-top: 10%;
   font-family: 'Fredoka One';
   margin-left: 20%;
   margin-right: 20%;
}
 }

</style>
