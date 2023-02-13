<template>
  <div>
    <form @submit.prevent="submitForm">
      <input v-model="username" type="text" placeholder="Username">
      <input v-model="password" type="password" placeholder="Password">
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  props: {
    redirectTo: String,
  },
  methods: {
    submitForm() {
      fetch('https://api.mediehuset.net/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: this.username,
          password: this.password,
        }),
      })
        .then(response => response.json())
        .then(data => {
          if (data.status != 'data.status') {

            this.setAuthData(data);
            localStorage.setItem("UserAuth", JSON.stringify(data));
            window.location.reload()

          } else {
            alert("lol wrong")
          }

        })
        .catch(error => {
          console.error(error);
        });
    },
    ...mapMutations(['setAuthData']),
  },

};
</script>