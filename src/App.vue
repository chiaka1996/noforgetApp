  <template>
  <div id="main_app">
    <b-navbar toggleable id="nav_container" >
    <b-navbar-brand><router-link to="/" id="loggo"><h2>noForget</h2></router-link></b-navbar-brand>

    <b-navbar-toggle target="navbar-toggle-collapse" v-if="loggedIn">
         <template id="userTemplate">
        <font-awesome-icon id="user_icon" v-if="loggedIn" :icon="['fas', 'user-circle']" size='2x' />
        <span v-if="loggedIn" id="userName">{{userProfile.username}}</span>
      </template>
    </b-navbar-toggle>

    <b-collapse id="navbar-toggle-collapse" is-nav v-if="loggedIn">
      <b-navbar-nav class="ml-auto">
        <b-nav-item class="links" @click="dashboard_link">Dashboard</b-nav-item>
        <b-nav-item class="links" @click="profile_link">Profile</b-nav-item>
        <b-nav-item class="links" @click="changepassword_link">Change Password</b-nav-item>
        <b-nav-item class="links" @click="logout">Log out</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
    <router-view/>
  </div>
  </template>

  <script>
import { mapState } from 'vuex'
import { mapActions } from 'vuex'
  export default {
    name: 'main_app',
    data () {
      return {
        
      }
    },

    computed: {
      ...mapState([ 'loggedIn', 'userProfile']),
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

    changepassword_link () {
      this.$router.push('/changepassword')
    },

     logout () {
       localStorage.clear()
       this.checkUserLogin(false)
       this.addUserProfile({})
       this.$router.push('/home')
     }
    }

  }
</script>

<style lang="scss">
#main-app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  padding-top: 0;
  margin-top: 0;
}

#nav_container {
    display: flex;
    background-color:  #33C7FF;
    width: 100%;
    height: 100%;
    padding-top: 2%;
    padding-left: 2%;
    padding-right: 5%;

    #user_icon {
      margin-top: 1%;
      color: white;
  }
    span {
      color: white;
      margin-top: 2%;
    }  
  }

#flex_1 {
  flex: 1
}

#userName {
  font-family: 'Fredoka One';
  color: white;
  font-size: 15px;
}

h2{
    color: white;
    margin-left: 5%;
    font-size: 30px;
    font-weight: bold;
    font-family: 'Fredoka One';
  }

  #loggo {
    text-decoration: none;
  }

  .links {
    color:  #33C7FF;
    cursor: pointer;
    font-size: 15px;
    font-family: 'Fredoka One';
  }
  .links:hover {
    background-color: white;
  }

  //for ipad
   @media only screen and (min-width: 710px) and (max-width: 1030px) {

      #nav_container {
    display: flex;
    background-color:  #33C7FF;
    width: 100%;
    height: 100%;
    padding-top: 6%;
    padding-left: 2%;
    padding-right: 5%;

    #user_icon {
      margin-top: 1%;
      color: white;
  }
    span {
      color: white;
      margin-top: 2%;
    }  
  }

 h2{
    color: white;
    margin-left: 5%;
    font-size: 50px;
    font-weight: bold;
    font-family: 'Fredoka One';
  }

}

  //for desktop view
  @media only screen and (min-width: 1031px) {

    #nav_container {
    display: flex;
    background-color:  #33C7FF;
    width: 100%;
    height: 100%;
    padding-top: 2%;
    padding-left: 2%;
    padding-right: 5%;

    #user_icon {
      margin-top: 1%;
      color: white;
  }
    span {
      color: white;
      margin-top: 2%;
    }  
  }

  
h2{
    color: white;
    margin-left: 5%;
    font-size: 30px;
    font-weight: bold;
    font-family: 'Fredoka One';
  }

    .links {
    color:  #33C7FF;
    cursor: pointer;
    font-size: 15px;
  }
  .links:hover {
    background-color: white;
  }
  }

</style>
