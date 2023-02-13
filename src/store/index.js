import { createStore } from 'vuex'

export default createStore({
  state: {
    authData: null,
    isDropped:false
  },
  mutations: {
    setAuthData(state, data) {
      state.authData = data;
    },
    DropDown(){
      this.isDropped = !this.isDropped
  }
  },
  actions: {
    LogOut({ commit }) {
      commit('setAuthData', null);
    },
  },
  modules: {},
});
