<template>
  <div>
    <h3>Home page</h3>
    <p v-if="!loggedIn">
      Please,
      <router-link to="/login">login</router-link>
    </p>
  </div>
</template>

<script>
import { authComputed } from '../vuex/helpers';

export default {
  computed: {
    ...authComputed
  }
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
