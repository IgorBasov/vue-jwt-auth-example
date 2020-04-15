<template>
  <div>
    <h3>Dashboard</h3>

    <p v-if="!inProgress">
      Hello, <strong>{{ name }}</strong> ({{ email }})
    </p>
    <p v-else>
      Loading user data...
    </p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      inProgress: true,
      name: '',
      email: ''
    };
  },
  created() {
    axios.get('http://localhost:3000/whoami').then(({ data }) => {
      this.name = data.name;
      this.email = data.email;
      this.inProgress = false;
    });
  }
};
</script>
