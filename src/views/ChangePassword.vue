<template>
    <div id="changepassword">
       <div id="errorMessage">{{errorMessage}}</div>
          <div id="successMessage">{{successMessage}}</div>
        <div v-if="loggedIn">
      <form>
        <div class="label">old password</div>
        <input v-model="details.oldPassword" type="password" required />

        <div class="label">new password</div>
        <input v-model="details.newPassword" type="password" required /> 

        <div class="label">confirm new password</div>
        <input v-model="details.confirmNewPassword" type="password" required />

        <button type="submit" @click="changePassword">Change Password</button>
      </form>
      </div>
       <div v-if="!loggedIn">
          you must be <router-link>Logged in</router-link> to access this page
      </div>
    </div>

</template>

<script>
import { mapState } from 'vuex'
import { mapActions } from 'vuex'
import axios from 'axios'

  export default {
    name: 'main_app',
    data () {
      return {
        details: {
          oldPassword: "",
          newPassword: "",
          confirmNewPassword: ""
        },

        errorMessage: '',
        successMessage: ""
      }
    },

    computed: {
      ...mapState([ 'loggedIn', 'userProfile'])
    },

    methods: {
       ...mapActions([ 
       'addUserProfile', 'checkUserLogin'
     ]),
    
      changePassword (e) {
        e.preventDefault();

        this.errorMessage = ''
        this.successMessage = ''

        const {oldPassword, newPassword, confirmNewPassword } = this.details;

        if (oldPassword.length < 7 || newPassword < 7) {
          this.errorMessage = "password should be 7 or more characters"
        }
        else {
          if(newPassword !== confirmNewPassword) {
            this.errorMessage = "password and confirm password do not match"
          }
          else {
            let data = {
              oldPassword,
              newPassword,
              email: this.userProfile.email,
              username: this.userProfile.username,
              _id: this.userProfile._id
            }

             axios.post("https://backendfornoforget.herokuapp.com/apis/changepassword", data)
            .then(
               (response) => {
                 const {status, data} = response

                 if (status === 201) {
                   this.errorMessage = data
                 }
                 else {
                   this.successMessage = data
                  this.details.oldPassword = ""
                   this.details.newPassword = ""
                   this.details.confirmNewPassword = ""
                 }
               }
             ).catch((error) => alert(error))
          }
        }
      }

    }

  }
</script>

<style lang="scss" scoped>
    #changepassword {
        margin-top: 50%;
        padding-left: 2%;
        padding-right: 2%;
        font-family: 'Fredoka One',
    }

    .label {
        color: #33C7FF;
    }

    input {
        width: 96%;
        height: 40px;
        color: grey;
        font-family: 'Times New Roman', Times, serif;
        border: 2px solid lightblue;
        border-radius: 5px;
        margin-bottom: 5%;
    }

    button {
        background-color: #33C7FF;
        border-radius: 10px;
        border: 2px solid grey;
        color: white;
    }

    #errorMessage {
  color: red;
  background-color: #FCE2E2;
}

#successMessage {
  color: green;
  background-color: lightgreen;
}

//ipad view
@media only screen and (min-width: 760px) and (max-width: 1029px) { 
    .label {
        color: #33C7FF;
        font-size: 35px;
    }

    input {
        width: 96%;
        height: 60px;
        color: grey;
        font-family: 'Times New Roman', Times, serif;
        border: 2px solid lightblue;
        border-radius: 5px;
        margin-bottom: 5%;
    }

    button {
        background-color: #33C7FF;
        border-radius: 10px;
        border: 2px solid grey;
        color:white;
        height: 60px;
        width: 30%;
    }
}

//desktop view
@media only screen and (min-width: 1030px) {
   #changepassword {
        margin-top: 13%;
        padding-left: 20%;
        padding-right: 20%;
        font-family: 'Fredoka One',
    }
}


</style>