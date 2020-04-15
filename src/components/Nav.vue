<template>
  <div class="nav">
    <router-link to="/" class="nav-item">Home</router-link>
    <router-link v-if="loggedIn" to="/dashboard" class="nav-item"
      >Dashboard</router-link
    >
    <router-link v-if="!loggedIn" to="/login" class="nav-item">
      Login
    </router-link>
    <button v-else class="nav-item" @click="logout">Logout</button>
  </div>
</template>

<script>
import { authComputed } from '../vuex/helpers';

export default {
  computed: {
    ...authComputed
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
    }
  }
};
</script>

<style scoped>
.nav {
  margin: 20px 0px 50px 0px;
}

.nav-item {
  margin-left: 10px;
}
</style>
