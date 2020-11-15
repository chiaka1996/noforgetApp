<template>
<div id="profile">

  <div class="successMessage">{{successMessage}}</div>
  <div class="errorMessage">
     <ul>
          <li v-for="(msg, index) in errorMessage" :key="index">{{msg}}</li>
        </ul>
  </div>

    <form>
    <div class="label">Username</div>
    <input v-model="profileUsername" type="text"  required/>

    <div class="label">Email</div>
    <input v-model="profileEmail" type="email" required/>

    <button @click="updateProfile">Update Profile</button>
    </form>

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
        profileUsername: '',
        profileEmail: '',
        errorMessage: [],
        successMessage: ''
      }
    },

    mounted () {
        if (this.loggedIn) {
            this.profileUsername = this.userProfile.username
            this.profileEmail = this.userProfile.email
        } 
    },

    computed: {
      ...mapState([ 'loggedIn', 'userProfile'])
    },

     methods: {
       ...mapActions([ 
       'addUserProfile', 'checkUserLogin'
     ]),

      updateProfile (e) {
        e.preventDefault()
        const userRegex = /[a-z]+[0-9]*/gi
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/gi

        if (!this.profileUsername || !this.profileEmail) {
          this.errorMessage.push("please fill all fields")
        }
        else {

         if (!userRegex.test(this.profileUsername) || this.profileUsername.length < 3 || this.profileUsername.length > 7) {
        this.errorMessage.push('username should start with a letter, contain only letters and numbers, be between 3 & 7 characters')
          }

        if (!emailRegex.test(this.profileEmail)) {
        this.errorMessage.push('please input the correct email')
          }

          if (this.errorMessage.length < 1) {
            let details = {
              _id: this.userProfile._id,
              email: this.profileEmail,
              username: this.profileUsername,
              password: this.userProfile.password

            }

            axios.post('https://noforgetappbackend.herokuapp.com/apis/updateprofile', details)
          .then(
            (response) => {
              
              if (response.status === 201) {
                this.errorMessage = [...response.data]
              }

              else {
                this.successMessage = "profile updated successfullly"
                this.addUserProfile(response.data)
                this.$router.go()
              }
            }
          ).catch( (err) => alert(err))
          }
        }
      }
     }

  }
</script>

<style lang="scss" scoped>

    .errorMessage {
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

    .successMessage {
      color: green;
      background-color: lightgreen;
    } 

    #profile {
        margin-top: 50%;
        padding-left: 2%;
        padding-right: 2%;
        font-family: 'Fredoka One';
    }

    input {
        width: 96%;
        height: 35px;
        border: 2px solid lightblue;
        border-radius: 5px;
        font-family:'Times New Roman', Times, serif;
        margin-bottom: 5%;
        color: grey;
    }

    .label {
        color:  #33C7FF;
    }

    button {
        background-color: #33C7FF;
        color: white;
        border-radius: 5px;
        border: 2px solid lightgrey;
    }

    //ipad view
    @media only screen and (min-width: 760px) and (max-width: 1029px) {
       input {
        height: 55px;
        font-size: 25px;
    }

    .label {
        color:  #33C7FF;
        font-size: 30px;
    }

     button {
        background-color: #33C7FF;
        color: white;
        border-radius: 5px;
        border: 2px solid lightgrey;
        height: 60px;
        width: 30%;
    }

    }

  //desktop view 
 @media only screen and (min-width: 1030px) {
   #profile {
        margin-top: 15%;
        padding-left: 20%;
        padding-right: 20%;
        font-family: 'Fredoka One';
    } 
 }
</style>