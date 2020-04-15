import Vue from 'vue';
import axios from 'axios';

import router from './router';
import store from './vuex/store';

import App from './App.vue';

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
  store,
  created() {
    const userString = localStorage.getItem('user');

    if (userString) {
      const user = JSON.parse(userString);
      this.$store.commit('SET_USER_DATA', user);
    }

    // Logout user if HTTP 401 receieved
    axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response.status === 401) {
          this.$store.dispatch('logout');
        }
        return Promise.reject(error);
      }
    );
  }
}).$mount('#app');
