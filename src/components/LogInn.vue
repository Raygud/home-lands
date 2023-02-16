<template>
  <div>
    <form @submit.prevent="submitForm">
      <h2>Login</h2>
      <p>Indtast dit brugernavn og adgangskode for at logge ind</p>
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

<style scoped lang="scss">
div {
  display: flex;
  justify-content: flex-start;
  margin-left: 9vw;
  margin-top: 7vw;

  h2 {
    font-size: 2vw;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2vw;
    text-align: left;
    width: 40%;
    color: black;

    input {
      padding: 0.5vw;
      box-shadow: 0vw 0vw 0.2vw rgba(0, 0, 0, 0.233);
      border: none;
      border-radius: 5px;
    }

    button {
      width: 20%;
      height: 2vw;
      border-radius: 7px;
      border: none;
      background-color: #000000;
      color: white;
    }
  }
}
</style>