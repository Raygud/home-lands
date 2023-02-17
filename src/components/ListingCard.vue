<template>
    <div class="grid-item" v-if="Listing">

        <router-link :to="`/boliger-til-salg/${Listing.id}`">
            <img :src="Listing.images[0].filename.medium" alt="">
            <ol>
                <li class="Adress">
                    <h2>{{ Listing.address }}</h2>
                    <div class="Favorite">
                <li @click.prevent @click="deleteFavorite" v-if="this.$store.state.favoriteListings?.find(item => item.home_id === Listing.id) &&
                    this.$store.state.authData">
                    <font-awesome-icon class="Icon __Color" icon="fa-solid fa-heart" />
                </li>
                <li @click.prevent @click="submitFavorite" v-else-if="this.$store.state.authData"><font-awesome-icon
                        class="Icon" icon="fa-regular fa-heart" />
                </li>
    </div>
    </li>
    <li>{{ Listing.zipcode }}</li>
    <li>{{ Listing.type }}</li>
    <li>
        <ol>

            <li v-bind:style="{ 'background-color': energy.find(item => item.value === Listing.energy_label_name).color }">
                {{ Listing.energy_label_name }}</li>
            <li>værelser {{ Listing.num_rooms }},</li>
            <li>{{ Listing.floor_space }} m&sup2;</li>
            <li>{{ Listing.price.substr(0, 1) }}.{{ Listing.price.substr(1, 3) }}.{{
                Listing.price.substr(4, Listing.price.length)
            }} DKK</li>
        </ol>

    </li>
    </ol>
    </router-link>
    </div>
    <div v-else>loading..</div>
</template>

<script>

import { mapMutations } from 'vuex';
import { postData, deleteData, fetchData } from '@/functions/Fetcher';

export default {
    setup() {

        return {}
    },
    data() {
        return {
            energy: [{ value: "A", color: "#01a54e" }, { value: "B", color: "#4cb848" }, { value: "C", color: "#4cb848" }, { value: "D", color: "#fef102" }, { value: "E", color: "#fcb913" }, { value: "F", color: "#f36e21" }, { value: "G", color: "#ee1d23" }],
        };
    },
    props: {
        Listing: Object
    },
    mounted() {
    },
    methods: {
        async submitFavorite() {
            console.log(this.$store.state.authData.access_token)
            const body = { home_id: this.Listing.id }
            const url = "https://api.mediehuset.net/homelands/favorites";
            const response = await postData(url, body, this.$store.state.authData.access_token);
            console.log(response);
            this.refreshFavorites()
        },
        deleteFavorite() {
            deleteData(`https://api.mediehuset.net/homelands/favorites/${this.Listing.id}`, this.$store.state.authData.access_token)
                .then(data => {
                    console.log(data)
                    this.refreshFavorites()
                })
                .catch(error => {
                    console.error(error);
                })
        },
        refreshFavorites() {
            if (this.$store.state.authData) {
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
        ...mapMutations(['setFavoriteListings']),

    }


}
</script>

<style lang="scss" scoped>
.grid-item {
    position: relative;
    padding: 1.5vw;
    text-align: left;
    background-color: rgb(255, 255, 255);
    box-shadow: 0.1vw 0.1vw 1vw 0.1vw rgba(0, 0, 0, 0.114);
    color: black;
    transition: 300ms ease-in-out;

    &:hover {
        transform: scale(1.1);
    }

    img {
        width: 100%;
        aspect-ratio: 1/0.8;
    }

    li:last-child {
        ol {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            gap: 0.2vw;

            li:first-child {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 2vw;
                aspect-ratio: 1/1;
                color: white;
                font-weight: bolder;
            }

            li:last-child {
                margin-left: auto;
            }
        }
    }
}

.__Color {
    color: red;
}

.Favorite {
    font-size: 2vw;
}

.Adress {
    display: flex;
    justify-content: space-between;
}
</style>