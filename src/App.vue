  <template>
  <div id="main_app">
    <nav>
      <div id="nav_container">
      <router-link to="/" id="loggo"><h2>noForget</h2></router-link>
      
      <div id='flex_1'></div>
       <!-- <h1 id='user_icon'> -->
         <div class="dropdown">
         <font-awesome-icon id="user_icon" v-if="loggedIn" :icon="['fas', 'user-circle']" size='2x' />
          <span v-if="loggedIn" id="userName">{{userProfile.username}}</span>

           <div class="dropdown-content">
              <div><router-link to="/dashboard" class="links">Dashboard</router-link></div>
              <div><router-link to="/profile" class="links">Profile</router-link></div>
              <div><router-link to="/changepassword" class="links">Change Password</router-link></div>
               <div class="links" v-on:click="logout">Log out</div>
              
            </div>
          </div>
        <!-- </h1> -->
        </div>
    </nav>
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

#flex_1 {
  flex: 1
}

#userName {
  font-family: 'Fredoka One';
  font-size: 15px;
}

h2{
    color: white;
    margin-left: 5%;
    font-size: 30px;
    font-weight: bold;
    font-family: 'Fredoka One';
  }

  nav{
    background-color: #33C7FF;
    position: fixed;
    top: 0;
    width: 100%;
    height: 12%;
  }

  #nav_container {
    display: flex;
    background-color:  #33C7FF;
    width: 100%;
    height: 100%;
    padding-top: 8%;
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

  #loggo {
    text-decoration: none;
  }

  .dropdown {
  position: relative;
  display: inline-block;
}

  .dropdown-content {
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  color:  #33C7FF;
  font-family: 'Fredoka One';
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}
.dropdown:hover .dropdown-content {
  display: block;
  }

  .dropdown:active .dropdown-content {
  display: block;
  }

  .links {
    color:  #33C7FF;
    cursor: pointer;
    font-size: 13px;
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
  }

</style>
