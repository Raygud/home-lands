<template>
    <div v-if="listing.images" class="Listings-Details-Container"
        :style="{ backgroundImage: 'url(' + listing.images[0].filename.large + ')' }"></div>
    <div v-else></div>
    {{ listingLon }}
    <div v-if="listing.images">

        <div v-if="listing.energy_label_name" class="Listings-Details-Container__Info">
            <div class="Info__Initial-Info">
                <ol>
                    <li>{{ listing.address }}</li>
                    <li>{{ listing.zipcode }} {{ listing.city }}</li>
                    <li>{{ listing.type }} | {{ listing.floor_space }} m&sup2; | {{ listing.num_rooms }}</li>
                    <li>set {{ listing.num_clicks }} gange</li>
                </ol>
                <ol class="Info__Button-Menu">
                    <li @click="ocModal"><font-awesome-icon class="Icon" icon="fa-solid fa-camera" /></li>
                    <li @click="ocFloor"><font-awesome-icon class="Icon" icon="fa-solid fa-ruler-combined" /></li>
                    <li @click="ocMap"><font-awesome-icon class="Icon" icon="fa-solid fa-location-dot" /></li>
                    <li @click="deleteFavorite" v-if="this.$store.state.favoriteListings?.find(item => item.home_id === listing.id) &&
                        this.$store.state.authData">
                        <font-awesome-icon class="Icon __Color" icon="fa-solid fa-heart" />
                    </li>
                    <li @click="submitFavorite" v-else-if="this.$store.state.authData"><font-awesome-icon class="Icon"
                            icon="fa-regular fa-heart" />
                    </li>
                </ol>
                <ol>
                    <li>Kontantpris {{ listing.price }} DKK</li>
                    <li>Udbetaling {{ listing.payout }}</li>
                    <li>Ejerudgift, per måned {{ listing.cost }}</li>

                </ol>
            </div>
            <div class="Info__Detailed-Info">
                <ol>
                    <li>Sagsnr. {{ listing.id }}</li>
                    <li>Boligareal {{ listing.floor_space }} m&sup2;</li>
                    <li>Grundareal {{ listing.ground_space }} m&sup2;</li>
                    <li>Antal rum {{ listing.num_rooms }}</li>
                    <li>Antal plan {{ listing.num_floors }}</li>
                </ol>
                <ol>
                    <li>Kælder {{ listing.basement_space }} m&sup2;</li>
                    <li>Byggeår {{ listing.year_construction }}</li>
                    <li>Ombygget {{ listing.year_rebuilt }}</li>
                    <li>
                        Energimærke <span class="Energy-Rating"
                            v-bind:style="{ 'background-color': energy.find(item => item.value === listing.energy_label_name).color }">
                            {{ listing.energy_label_name }}</span></li>
                    <li>Liggetid {{ Math.round((new Date() - new Date(listing.date_stamp * 1000)) /
                        (1000
                            * 60 * 60 * 24)) }} dage</li>
                </ol>
                <ol>
                    <li>Kontantpris {{ listing.price }}</li>
                    <li>Udbetaling {{ listing.floor_space }}</li>
                    <li>Grundareal {{ listing.payout }}</li>
                    <li>Brutto ex. ejerudgift {{ listing.gross }}</li>
                    <li>Netto ex. ejerudgift {{ listing.net }}</li>
                    <li>Ejerudgift {{ listing.cost }}</li>

                </ol>
            </div>
            <div class="Info__Bottom-Info">
                <p>
                    {{ listing.description }}
                </p>
                <div>
                    <h4>Kontakt</h4>
                    <img :src="listing.staff.image" alt="">
                    <ol>
                        <li>{{ listing.staff.firstname }} {{ listing.staff.lastname }}</li>
                        <li>{{ listing.staff.position }}</li>
                        <li>Mobil: <a :href="`tel:+${listing.phone}`">{{ listing.staff.phone }}</a></li>
                        <li>Email: <a :href="`mailto:+${listing.email}`">{{ listing.staff.email }}</a></li>
                    </ol>
                </div>
            </div>
        </div>
        <div v-else>
            Loading..
        </div>
    </div>
    <div v-else>
        Loading..
    </div>


    <ImageModal :Images="listing.images" ref="ModalRef" />
    <FloorPlan :Images="listing" ref="FloorRef" />
    <LeafletMap ref="MapRef" v-if="listingLat && listingLon" :lat="listingLat" :lon="listingLon" />
</template>

<script>



import FloorPlan from '@/components/FloorPlan.vue';
import ImageModal from '@/components/ImageModal.vue';
import LeafletMap from '@/components/LeafletMap.vue';
import { fetchData, postData, deleteData, getGeo, patchData } from '@/functions/Fetcher';
import { mapMutations } from 'vuex';


export default {
    setup() {

        return {};
    },
    data() {
        return {
            listing: [],
            listingLat: "",
            listingLon: "",
            energy: [{ value: "A", color: "#01a54e" }, { value: "B", color: "#4cb848" }, { value: "C", color: "#4cb848" }, { value: "D", color: "#fef102" }, { value: "E", color: "#fcb913" }, { value: "F", color: "#f36e21" }, { value: "G", color: "#ee1d23" }],
        };
    },
    computed: {
        id() {
            return this.$route.params.id;
        },
    },
    mounted() { //HIGHLIGHT this is very nice 😩😍 proud of this
        fetchData(`https://api.mediehuset.net/homelands/homes/${this.id}`)
            .then(data => {
                this.listing = data.item;
                console.log(this.listing);
                getGeo(`${this.listing.address} ${this.listing.zipcode} ${this.listing.city} Denmark`, process.env.VUE_APP_API_KEY)
                    .then(data => {
                        this.listingLat = data.features[0].properties.lat
                        this.listingLon = data.features[0].properties.lon
                        console.log(this.listingLat);
                        console.log(this.listingLon);
                    })
                    .catch(error => {
                        console.error(error);
                    });
            })
            .catch(error => {
                console.error(error);
            });

        patchData(`https://api.mediehuset.net/homelands/homes/${this.id}`, this.$store.state.authData.access_token)
            .then(data => {
                this.review = data
                console.log(this.review)

            })
            .catch(error => {
                console.error(error);
            });

    },
    components: { ImageModal, FloorPlan, LeafletMap },
    methods: {
        ocModal() {
            //calls child function
            this.$refs.ModalRef.openCloseModal();
        },
        ocFloor() {
            //calls child function
            this.$refs.FloorRef.openCloseFloor();
        },
        ocMap() {
            //calls child function
            this.$refs.MapRef.openCloseMap();
        },
        async submitFavorite() {
            console.log(this.$store.state.authData.access_token)
            const body = { home_id: this.listing.id }
            const url = "https://api.mediehuset.net/homelands/favorites";
            const response = await postData(url, body, this.$store.state.authData.access_token);
            console.log(response);
            this.refreshFavorites()
        },
        deleteFavorite() {
            deleteData(`https://api.mediehuset.net/homelands/favorites/${this.listing.id}`, this.$store.state.authData.access_token)
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
.Main {
    min-height: 130vh;
}

div {
    color: black;

    .Listings-Details-Container {
        position: absolute;
        width: 100%;
        height: 50vh;
        background-size: cover;
        background-position: bottom 50% center;
        z-index: -10;
    }

    .Listings-Details-Container__Info {
        margin: auto;
        margin-top: 20vw;
        padding-top: 1vw;
        width: 80%;
        background-color: rgba(255, 255, 255, 0.842);
        box-shadow: 0vw 0vw 0.4vw rgba(0, 0, 0, 0.397);
        border-radius: 3px;
    }
}

.Info__Initial-Info {
    display: flex;
    justify-content: space-between;
    margin: 2vw 2vw 0 2vw;


    .Info__Button-Menu {
        display: flex;
        gap: 2vw;

        li {
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: rgba(255, 255, 255, 0.712);
            border-radius: 50%;
            border: 1px solid rgb(211, 211, 211);
            width: 3vw;
            height: 3vw;
            font-size: 2vw;
        }
    }
}

.Info__Detailed-Info {
    display: flex;
    justify-content: space-between;
    margin: 2vw 2vw 0 2vw;
}

.Energy-Rating {
    display: inline-block;
    width: 1vw;
    aspect-ratio: 1/1;
    color: white;
    font-weight: bolder;

}

.Info__Bottom-Info {
    display: flex;
    justify-content: space-between;
    gap: 10vw;
    margin: 2vw 2vw 0 2vw;

    p {
        width: 75%;
    }

    div {
        img {
            width: 100%;
        }
    }

}

.__Color {
    color: red;
}
</style>