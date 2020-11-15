/* eslint-disable prefer-const */
export default {
  ADDUSERPROFILE: (state, payload) => {
    localStorage.userdetails = JSON.stringify(payload)
    state.userProfile = payload
  },

  LOGINUSER: (state, payload) => {
    localStorage.loggedIn = payload
    state.loggedIn = payload
  },

  initialiseLoggedInStore (state) {
    if (JSON.parse(localStorage.loggedIn)) {
      state.loggedIn = true
    }
  },

  initialiseUserProfileStore (state) {
    if (JSON.parse(localStorage.loggedIn)) {
      state.userProfile = JSON.parse(localStorage.userdetails)
    }
  }

}
