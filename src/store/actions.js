export default {
  addUserProfile: (context, payload) => {
    context.commit('ADDUSERPROFILE', payload)
  },

  checkUserLogin: (context, payload) => {
    context.commit('LOGINUSER', payload)
  }

}
