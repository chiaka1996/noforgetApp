<template>
  <div id="dashboard">
    <div v-if="loggedIn">
    <div id='greetings'>

      <span v-if="checkTime < 4">Good Morning <font-awesome-icon :icon="['fas', 'smile-beam']" size='sm' id='smiley' />, you should be sleeping</span>

      <span v-if="checkTime >= 4 && checkTime < 12">Good Morning <font-awesome-icon :icon="['fas', 'smile-beam']" size='sm' id='smiley' />, remember not to skip breakfast</span>

      <span v-if="checkTime >= 12 && checkTime < 19">Good Day <font-awesome-icon :icon="['fas', 'smile-beam']" size='sm' id='smiley' />, remember to wash your hands</span>

      <span v-if="checkTime > 18 && checkTime < 24">Good Evening <font-awesome-icon :icon="['fas', 'smile-beam']" size='sm' id='smiley' />, Time for bed</span>
     
      <div id='greeting_flex'></div> 
      <button v-if="addEvent" @click="toggleDashboard" id='add_event'>Add Event</button>
      <button v-if="!addEvent" @click="toggleDashboard" id= 'add_event2'>Back</button>

      </div>

      <div v-if="errorMessage" id="errorMessage">{{errorMessage}}</div>
      <div v-if="successMessage" id="successMessage"> {{successMessage}} </div>

<section v-if="addEvent"  >
  <div v-for="(todo, index) in toDoPlans" :key="index"  >
    
    <div class="grid-container">
      <div class="grid-items">
        <div id="checkBox"><input type="checkbox" v-if="todo.status===false"    @click="onclickCheckBox(todo._id, todo.plan, todo.planDate, todo.email, todo.status)" > </div>
        <div id="checkBox"><input type="checkbox" v-if="todo.status===true" checked @click="onclickCheckBox(todo._id, todo.plan, todo.planDate, todo.email, todo.status)" > </div>
      </div>
  <div class='grid-items' >
    <div v-if="todo.status===true" class="line_through">{{todo.plan}}</div>
    <div v-if="todo.status===false">{{todo.plan}}</div>
  </div>
  <div class="grid-items">
    <div class="grid-container2">
      <div class="grid-items2">
        <font-awesome-icon :icon="['fas', 'trash-alt']" size='lg' id='delete_bin' @click="onclickDelete(todo._id)" />
        </div>
      <div class="grid-items2">
        <font-awesome-icon :icon="['fas', 'pen']" size='lg' id='edit_pen' @click="onclickEdit(todo._id, todo.plan, todo.planDate, todo.email, todo.status)" />
        </div>
    </div>
  </div>
  </div>
  <span class="plandate">{{todo.planDate}}</span>
  </div>
</section>

<!-- section for adding plans to the list -->
<section v-if='!addEvent'>
  <form >
    <div>Add Plan</div>
    <input v-model="dataList.plan" type="text" required/><br/>

    <div>Date of execution</div>
    <input v-model="dataList.planDate" type="date" required/><br/>

    <button @click="AddPlanToDatabase" v-if="submitStatus === 'Submit'" type="submit">{{ submitStatus}}</button>
    <button @click="editDatabase" v-if="submitStatus === 'Edit'" type="submit">{{ submitStatus}}</button>
  </form>
</section>
  </div>
  <div v-if="!loggedIn">
    please, you must <router-link to="/login" id="login">Log in</router-link> to view this page.
  </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'

  export default {
    name: 'dashboard',
    data () {
      return {
          addEvent: true,         
          dataList: {
            plan: '',
            planDate: '',
            email: '',
            status: false     
          },
          errorMessage: '',
          successMessage: '',
          toDoPlans: [],
          submitStatus: 'Submit',
          editData: {
            _id: '',
            email: '',
            status: ''
          },
          updateDashboard: false
      }
    },

    mounted () {
        if (this.loggedIn) {
          this.checkTime
          this.getPlansFromTheDatabase   
         }
      
    },

    computed: {
      ...mapState([ 'userProfile', 'loggedIn']),

      checkTime () {
        let eventDate = new Date();
        return eventDate.getHours();
      },
       getPlansFromTheDatabase () {

         let formData = {
           email: this.userProfile.email
         }

        axios.post("https://backendfornoforget.herokuapp.com/apis/getplans", formData)
        .then(
          (response) => {

            this.toDoPlans = [...response.data];
          }
        ).catch((error) => alert(error))
      }
    },

    methods: {

      
      toggleDashboard () {
        this.addEvent = !this.addEvent
      },

      AddPlanToDatabase (e) {
        e.preventDefault()
        let formData = {
          plan: this.dataList.plan,
          planDate: this.dataList.planDate,
          email: this.userProfile.email,
          status: this.dataList.status
        }

        if (!formData.plan || !formData.planDate || !formData.email) {
          this.errorMessage = "please fill all fields";
        }
        else{

          axios.post("https://backendfornoforget.herokuapp.com/apis/addplan", formData)
          .then(
            (response) => {
              if (response.status == 201) {
                this.errorMessage = response.data;
              }
              else {
                this.successMessage = response.data;
                this.dataList.plan = ''
                this.dataList.planDate = ''
                this.$router.go()

              }
            }
          ).catch(()=> alert('please check your network connection'))

        }
      },

      //edit database
      editDatabase (e) {

        e.preventDefault()

        let data = {
          _id: this.editData._id,
          plan: this.dataList.plan,
          planDate: this.dataList.planDate,
          email: this.editData.email,
          status: this.editData.status
        }

         if (!data.plan || !data.planDate || !data.email) {
          this.errorMessage = "please fill all fields";
        }
        else{

          axios.post("https://backendfornoforget.herokuapp.com/apis/editplan", data)
          .then(
            (response) => {
              if (response.status == 201) {
                this.errorMessage = response.data;
              }
              else {
                this.successMessage = response.data;
                this.dataList.plan = ''
                this.dataList.planDate = ''
                this.$router.go()

              }
            }
          ).catch((err)=> alert(err))

        }
      },

      //delete plan from dashboard
      onclickDelete (id) {
        
        let data = {
          _id: id
        }

        axios.post("https://backendfornoforget.herokuapp.com//apis/deleteplan", data)
        .then(
          (response) => {
            this.errorMessage = response.data
            this.$router.go()
            
          }
        ).catch((err) => alert(err))

      },

      //when the edit button is clicked
      onclickEdit (_id, plan, planDate, email, status) {

        this.dataList.plan = plan
        this.dataList.planDate = planDate  
        this.addEvent = !this.addEvent

        this.editData = {
          _id,
          email,
          status
        }
        this.submitStatus = "Edit"
      },

      //when the checkbox is clicked
      onclickCheckBox (_id, plan, planDate, email, status) {
        
        let data = {
          _id,
          plan,
          planDate,
          email,
          status: !status
        }

        axios.post("https://backendfornoforget.herokuapp.com/apis/updatestatus", data)
          .then(
            () => {
              this.$router.go()
            }
          ).catch((err) => alert(err))

      } 

      
    }

  }
</script>

<style lang='scss' scoped>

#dashboard{
  margin-top: 11%;
  
}

.line_through {
  text-decoration: line-through;
  text-decoration-color: black;
}

.grid-container {
  display: grid;
  grid-template-columns: 5% 80% 15%;
  background-color: #33C7FF;
  font-family: 'Fredoka One';
  color: white;
  margin-top: 7%;
  margin-left: 4%;
  margin-right: 3%;
  width: 90%; 
  min-height: 100px;
  box-shadow: 2px 2px 2px 2px lightblue;

  .grid-items {
    border: 1px solid #33C7FF;
  }
}

#checkBox {
      margin-top: 200%;
      margin-right: 15%;
    }

.plandate {
  margin-left: 4%;
  color: grey;
  font-size: 13px;
  font-family: bold;
}

#errorMessage {
  color: red;
  background-color: #FCE2E2;
}

#successMessage {
  color: green;
  background-color: lightgreen;
}

.grid-container2 {
  display: grid;
  height: 100%;
  width: 100%;
  grid-template-rows: 50% 50%;

  .grid-items2 {
    background-color: white;
    border: 1px solid #33C7FF;
    padding-left: 20%; 
    padding-top: 25%;
  }
}

#delete_bin {
  color: red;
  cursor: pointer;
}

#edit_pen {
  color: lightgreen;
  cursor: pointer;
}

#greetings {
  color: grey;
  font-size: 12px;
  display: flex;
  font-family: 'Fredoka One';
  padding-left: 4%;
  padding-right: 5%;

  span {
    margin-top: 1.5%;
  }
}

#greeting_flex {
  flex: 1;
}

#add_event {
  font-family: 'Fredoka One';
  background-color: lightgreen;
  color: white;
  border-radius: 10px;
  border: 2px solid lightblue;
  cursor: pointer;
}

#add_event2 {
  font-family: 'Fredoka One';
  color: white;
  border-radius: 8px;
  border: 2px solid lightblue;
  cursor: pointer;
  background-color: red;
}

#smiley {
  color: #33C7FF;
}

//add plans
form {
  width: 100%;
  margin-top: 15%;
  padding-left: 3%;
  padding-right: 2%;

   div {
     font-family: 'Fredoka One';
     color: #33C7FF; 
   }
   
   input {
     width: 94%;
     border: 2px solid lightblue;
     border-radius: 5px;
     margin-bottom: 5%;
   }

   button {
     border-radius: 5px;
     background-color:  #33C7FF;
     color: white;
     width: 35%;
     font-family: 'Fredoka One';
   }
}

//desktop view 
 @media only screen and (min-width: 1030px) {
     #dashboard {
      margin-top: 2%;
      padding-left: 15%;
      padding-right: 15%;
  
  }
   }
</style>
