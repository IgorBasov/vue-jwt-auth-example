<template>
  <div>
    <form @submit.prevent="login">
      <label for="email">
        Email:
      </label>
      <input type="email" name="email" v-model="email" />

      <label for="password">
        Password:
      </label>
      <input type="password" name="password" v-model="password" />

      <button type="submit" name="button">Login</button>

      <p v-if="error" class="error-message">{{ error }}</p>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      error: null
    };
  },
  methods: {
    login() {
      this.$store
        .dispatch('login', {
          email: this.email,
          password: this.password
        })
        .then(() => this.$router.push({ name: 'dashboard' }))
        .catch(error => {
          this.error = error.response.data.data.message;
        });
    }
  }
};
</script>
