import Vue from 'vue'
import Vuex from 'vuex'
import Axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    serverUrl: null,
    currentUser: null
  },

  getters: {},

  mutations: {
    setServerUrl(state, payload) {
      state.serverUrl = payload;
    },
    setUser(state, payload) {
      state.currentUser = payload;
    }
  },

  actions: {
    fetchCurrentUser(context) {
      Axios.get(context.state.serverUrl + '/current-user', { withCredentials: true })
        .then(response => {
          context.commit('setUser', response.data);
        });
    },

    login(context, payload) {
      const formData = new FormData();
      formData.append('email', payload.email);
      formData.append('password', payload.password);
      return Axios.post(context.state.serverUrl + '/login', formData, { withCredentials: true })
        .then(() => {
          return context.dispatch('fetchCurrentUser');
        });
    },

    logout(context) {
      return Axios.post(context.state.serverUrl + '/logout', {}, { withCredentials: true })
        .then(() => {
          context.commit('setUser', null)
        });
    }
  },
});
