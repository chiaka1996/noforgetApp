<template>
    <div  class="forgotpassword">
        <div v-if="!loggedIn">
        <div class="successMessage">{{successMessage}}</div>
        <div class="errorMessage">{{errorMessage}}</div>
        <form class="form1">
        <div class="label">Enter Email</div>
        <input v-model="dataList.email" type="email" required />

        <button @click=" onsubmitEmail" >submit</button>
        </form>
    </div>

    <div v-if="loggedIn" >
        you are logged in already. Procedd to <router-link to="/changepassword"> change pasword </router-link> to change your password.
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
        dataList: {
            email: ''
        },

        changeClass: false,

        successMessage: "",
        errorMessage: ""
      }
    },

    computed: {
      ...mapState([ 'loggedIn', 'userProfile'])
    }, 

    methods: {
        ...mapActions([ 'addUserProfile', 'checkUserLogin']),

        onsubmitEmail (e) {
            e.preventDefault()
            const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/gi;

             if (!emailRegex.test(this.dataList.email)) {
                this.errorMessage = 'please input the correct email'
                 }

                 else{
                     console.log(this.dataList);
            axios.post("https://backendfornoforget.herokuapp.com/apis/forgotpassword", this.dataList)
        .then(
            (response) => {

                if( response.status === 201) {
                    this.errorMessage = response.data
                }

                if ( response.status === 200 ) {
                    this.successMessage = response.data
                    this.dataList.email = ""
                }
            }
        )
        }
        }
    }

  }

</script>

<style lang="scss" scoped>
    .forgotpassword {
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

    .green_border {
        width: 96%;
        height: 40px;
        color: grey;
        font-family: 'Times New Roman', Times, serif;
        border: 2px solid lightgreen;
        border-radius: 5px;
        margin-bottom: 5%;
    }

    button {
        background-color: #33C7FF;
        border-radius: 10px;
        border: 2px solid grey;
        color: white;
    }

    .errorMessage {
    color: red;
    background-color: #FCE2E2;
    }

    .successMessage {
    color: green;
    background-color: lightgreen;
    }

    @media only screen and (min-width: 1100px) {
        .forgotpassword {
        margin-top: 20%;
        padding-left: 20%;
        padding-right: 20%;
        font-family: 'Fredoka One',
    }

    input {
        margin-bottom: 2%;
    }
    }
</style>
