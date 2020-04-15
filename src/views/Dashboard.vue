<template>
  <div>
    <h3>Dashboard</h3>

    <p v-if="!inProgress">
      Hello, <strong>{{ name }}</strong> ({{ email }})
    </p>
    <p v-else>
      Loading user data...
    </p>
    <p v-if="error" class="error-message">{{ error }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      inProgress: true,
      name: '',
      email: '',
      error: null
    };
  },
  created() {
    axios
      .get('http://localhost:3000/whoami')
      .then(({ data }) => {
        this.name = data.data.name;
        this.email = data.data.email;
        this.inProgress = false;
      })
      .catch(error => {
        this.inProgress = false;
        this.error = error.response.data.data.message;
      });
  }
};
</script>
