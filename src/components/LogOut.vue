<template>
        <div  @click="logout" ><font-awesome-icon icon="fa-solid fa-right-from-bracket" /> Sign out</div>
</template>

<script>
import { mapActions } from 'vuex';
import store from '@/store';

export default {
    
    setup () {
        

        return {}
    },
    methods: {

    ...mapActions(['LogOut']),
    logout() {
      // clear vuex and local state
      this.LogOut().then(console.log(store.state.authData))
      localStorage.removeItem("UserAuth")
      window.location.reload()
    }}
}
</script>

<style lang="scss" scoped>

</style>