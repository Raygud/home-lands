
<template>
  <NavBar />
  <router-view class="minHeight" />
  <FooterComponent />
</template>

<script>

import NavBar from './components/NavBar.vue';
import { mapMutations } from 'vuex';
import FooterComponent from './components/FooterComponent.vue';
import { fetchData } from './functions/Fetcher';

export default {
  setup() {
    return {};
  },
  components: { NavBar, FooterComponent },
  mounted() {
    // if we are logged in we find the data in our local storage(persisting our login)
    const data = JSON.parse(localStorage.getItem("UserAuth"))
    // set our auth.state to the local storage value if it is empty then auth is undefined = we are not looged in
    this.setAuthData(data);
    // fetch all the data we need and save it in state
    fetchData("https://api.mediehuset.net/homelands/homes")
      .then(data => {
        this.setHousingListings(data.items)
        this.setFilteredListings(data.items)

      })
      .catch(error => {
        console.error(error);
      })

    if (this.authData) {
      fetchData("https://api.mediehuset.net/homelands/favorites", this.$store.state.authData.access_token)
        .then(data => {
          this.setFavoriteListings(data.items)
          console.log(this.$store.state.favoriteListings)
        })
        .catch(error => {
          console.error(error);
        });
    }
  },
  computed: {
    authData() {
      return this.$store.state.authData;
    },
  },
  methods: {
    ...mapMutations(['setAuthData', 'setHousingListings', 'setFilteredListings', 'setFavoriteListings']),
  },
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  text-decoration: none;
  list-style: none;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;

  a {
    color: inherit;
  }
}



#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
  min-height: 100vh;
  max-width: 100%;
}

.minHeight {
  min-height: 100vh;
}
</style>
