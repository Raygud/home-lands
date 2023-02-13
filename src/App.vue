<template>
  <NavBar />
  <router-view />
</template>

<script>
import NavBar from './components/NavBar.vue';
import { mapMutations } from 'vuex';

export default {
  setup() {
    return {};
  },
  components: { NavBar },

  mounted() {
    const data = JSON.parse(localStorage.getItem("UserAuth"))
    console.log(data)
    this.setAuthData(data);

  },
  computed: {
    authData() {
      return this.$store.state.authData;
    }
  },
  methods: {
    ...mapMutations(['setAuthData']),
  },
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  text-decoration: none;
  list-style: none;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
}
</style>
