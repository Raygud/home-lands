<template>
    <header>
        <nav>
            <router-link class="Logo WebOnly" to="/">HomeLands</router-link>
            <ol>
                <router-link class="WebOnly" to="/">Forside</router-link> |
                <router-link class="WebOnly" to="/boliger-til-salg">Boliger til salg</router-link>
                <router-link v-if="!authData" to="/Login"> | Login</router-link>
            </ol>

            <div class="Nav-Search-bar">
                <input v-on:input="SearchString" type="text" placeholder="Indtast søgord">
                <button>
                    <router-link @click="Search" :to="`/boliger-til-salg/filter/${this.searchFilter}`">
                    <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
                </router-link> 
                </button>
            </div>

            <div @click="DropDown" class="User-Tag" v-if="authData">
                <span>{{ authData ? authData.user.firstname.substr(0, 1) : null }}</span>
                <div @blur="DropDown" :class="isDropped ? 'User-Tag__Drop-Down __Show' : 'User-Tag__Drop-Down __Hide'">
                    <ol>
                        <li><router-link class="Menu-Link" to="/Profile"><font-awesome-icon icon="fa-solid fa-user" />
                                Your
                                profile</router-link>
                        </li>
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
import { mapMutations } from 'vuex';
import LogOut from './LogOut.vue';

export default {
    setup() {
        return {};
    },
    data() {
        return {
            isDropped: false,
            searchFilter: ''
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
        },
        SearchString(e){
            this.searchFilter = e.target.value
        },
    ...mapMutations(['setFilteredListings']),
    },
}
</script>

<style lang="scss" scoped>

@font-face {
    font-family: OdibeeSans;
    src: url(@/assets/fonts/OdibeeSans-Regular.ttf);
}

.Inverted-Triangle {

    position: absolute;
    bottom: -49%;
    width: 100%;
    height: 50%;
    background-color: black;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 31% 8%, 0 100%);
    z-index: 10;

}


header {
    position: relative;
    background-color: #000000;
    display: flex;
    justify-content: flex-end;
    height: 3.8vw;


    nav {
        position: relative;
        width: 90%;
        padding: 0.4vw;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 1.5vw;
        font-size: 1.3vw;

        a {
            font-weight: bold;
            color: #ffffff;

            &.router-link-exact-active {
                color: #AF7627;
            }

            &:hover {
                color: #AF7627;
            }
        }

        .Nav-Search-bar {
            border-radius: 5px;
            height: 45%;
            background-color: white;
            display: flex;

            input {
                background-color: rgba(255, 255, 255, 0);
                border: none;
                padding-left: 0.5vw;

                &:focus {
                    outline: none;
                }
            }

            button {
                height: 100%;
                padding: 0.25vw;
                background-color: #999999;
                border: none;
                border-top-right-radius: 5px;
                border-bottom-right-radius: 5px;
                color: white;
            }
        }
    }

    .Logo {
        position: absolute;
        left: 0;
        top: 35%;
        background-color: #AF7627;
        padding: 0.5vw 1vw 0.5vw 1vw;
        font-size: 2.4vw;
        color: #ffffff !important;
        z-index: 99;
        border: 2px solid black;
        font-family: OdibeeSans;
    }
}

.User-Tag {
    display: flex;
    justify-content: center;
    background-color: rgb(196, 75, 39);
    border-radius: 50%;
    padding: 0.4vw;
    height: 70%;
    aspect-ratio: 1/1;
    font-size: 200%;
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
        border-radius: 5px;
        right: 1vw;
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

    .Menu-Link {
        font-weight: bold;
        color: #000000;

        &.router-link-exact-active {
            color: #000000;
        }

        &:hover {
            color: #000000;
        }

    }

    .__Hide {
        display: none;
    }

    .__Show {
        display: block;
    }

}

@media all and (max-width: 390px)  {
    header {
        
        height: 15vw;
        nav{
            width: 100%;
            
            a{
                font-size: 5vw;
            }
        }
    }
    .User-Tag__Drop-Down {
        width: 40vw !important;
        font-size: 5vw !important;
    }

    .WebOnly{
        display: none;
    }

    .Nav-Search-bar{
        margin: auto;
    }

}



</style>