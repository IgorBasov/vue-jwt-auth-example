import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: { user: null },
  mutations: {
    SET_USER_DATA(state, data) {
      state.user = data;
      localStorage.setItem('user', JSON.stringify(data));
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
    },
    CLEAR_USER_DATA(/*state*/) {
      localStorage.removeItem('user');

      // state.user = null;
      // axios.defaults.headers.common['Authorization'] = null;
      location.reload();
    }
  },
  actions: {
    login({ commit }, credentials) {
      return axios
        .post('http://localhost:3000/login', credentials)
        .then(({ data }) => commit('SET_USER_DATA', data));
    },
    logout({ commit }) {
      commit('CLEAR_USER_DATA');
    }
  },
  getters: {
    loggedIn(state) {
      return !!state.user;
    }
  }
});
