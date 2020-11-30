import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentUser: {
      user_id: -1,
      name: 'Name',
      email: '123@123.com'
    },
  },
  getters: {},
  mutations: {
    setUser (state, payload) {
      state.currentUser = payload;
    }
  },
  actions: {},
});
