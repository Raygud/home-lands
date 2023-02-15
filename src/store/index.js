import { createStore } from 'vuex'

export default createStore({
  state: {
    authData: null,
    isDropped: false,
    housingListings: [],
    filteredListings: [],
    favoriteListings: []

  },
  mutations: {
    setAuthData(state, data) {
      state.authData = data;
    },
    setHousingListings(state, data) {
      state.housingListings = data
    },
    setFilteredListings(state, data) {
      state.filteredListings = data
    },
    setFavoriteListings(state, data) {
      state.favoriteListings = data
    },
    DropDown() {
      this.isDropped = !this.isDropped
    }
  },
  actions: {
    LogOut({ commit }) {
      commit('setAuthData', null);
    }
  },
  modules: {},
});
