<template>
    <header>
        <nav>
            <router-link class="Logo" to="/">HomeLands</router-link> 
            <ol>
                <router-link to="/">Forside</router-link> |
            <router-link to="/Cart">Boliger til salg</router-link>
            <router-link v-if="!authData" to="/Login"> | Login</router-link>
            </ol>

            <input type="text">

            <div @click="DropDown" class="User-Tag" v-if="authData">
            <span>{{ authData? authData.user.firstname.substr(0, 1): null }}</span>
            <div @blur="DropDown" :class="isDropped ? 'User-Tag__Drop-Down __Show' : 'User-Tag__Drop-Down __Hide'">
                <ol>
                    <li><font-awesome-icon icon="fa-solid fa-user" /> Your profile</li>
                    <li><font-awesome-icon icon="fa-solid fa-gear" />Settings</li>
                    <li>
                        <LogOut />
                    </li>
                </ol>
            </div>
        </div>

        </nav>
        <div class="Inverted-Triangle"></div>
    </header>
</template>

<script>
import LogOut from './LogOut.vue';

export default {
    setup() {
        return {};
    },
    data() {
        return {
            isDropped: false,
        }
    },
    computed: {
        authData() {
            return this.$store.state.authData;
        }
    },
    components: { LogOut },
    methods: {
        DropDown() {
            this.isDropped = !this.isDropped
        }
    },
}
</script>

<style lang="scss" scoped>

.Inverted-Triangle{

    position: absolute;
    bottom: -49%;
    width: 100%;
    height: 50%;
    background-color: black;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 31% 8%, 0 100%);
    z-index: 10;

}


header{
    position: relative;
    background-color: #000000;
    display: flex;
    justify-content: flex-end;
    height: 5.1vw;


nav {
    position: relative;
  width: 90%;
  padding: 0.4vw;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1.5vw;

  a {
    font-weight: bold;
    color: #ffffff;

    &.router-link-exact-active {
      color: #AF7627;
    }
  }
}

.Logo{
    position: absolute;
    left: 0;
    top: 15%;
    background-color: #AF7627;
    padding: 1vw;
    font-size: 2.4vw;
    color: #ffffff !important;
    z-index: 99;
}
}
.User-Tag {
    display: flex;
    justify-content: center;
    background-color: greenyellow;
    border-radius: 50%;
    padding: 0.4vw;
    height: 70%;
    aspect-ratio: 1/1;
    font-size: 3vw;
    text-align: center;
    font-weight: bold;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    color: white;
    cursor: pointer;

    span {
        align-self: center;
    }

    .User-Tag__Drop-Down {
        position: absolute;
        top: 110%;
        border-radius: 15px;
        right: 0;
        width: 10vw;
        height: auto;
        box-shadow: 0.2vw 0.2vw 0.2vw 0.2vw rgba(0, 0, 0, 0.277);
        color: black;
        background-color: white;
        font-size: 1vw;
        z-index: 99;

        ol {

            li {
                display: flex;
                justify-content: flex-start;
                gap: 0.5vw;
                padding: 0.5vw;
            }
        }
    }

    .__Hide {
        display: none;
    }

    .__Show {
        display: block;
    }

}
</style>