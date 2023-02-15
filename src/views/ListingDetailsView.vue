<template>
    <div v-if="listing.images">
        <div class="Listings-Details-Container"
            :style="{ backgroundImage: 'url(' + listing.images[0].filename.large + ')' }"></div>
        <div class="Listings-Details-Container__Info">
            <div class="Info__Initial-Info">
                <ol>
                    <li>{{ listing.address }}</li>
                    <li>{{ listing.zipcode }} {{ listing.city }}</li>
                    <li>{{ listing.type }} | {{ listing.floor_space }} m&sup2; | {{ listing.num_rooms }}</li>

                </ol>
                <ol class="Info__Button-Menu">
                    <li><font-awesome-icon class="Icon" icon="fa-solid fa-camera" /></li>
                    <li><font-awesome-icon class="Icon" icon="fa-solid fa-ruler-combined" /></li>
                    <li><font-awesome-icon class="Icon" icon="fa-solid fa-location-dot" /></li>
                    <li><font-awesome-icon class="Icon" icon="fa-regular fa-heart" /></li>
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
                        Energimærke <span
                            v-bind:style="{ 'background-color': energy.find(item => item.value === listing.energy_label_name).color }">
                            {{ listing.energy_label_name }}</span></li>
                    <li>Liggetid [OBJECT, OBJECT]</li>
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

    </div>

    <div v-else>
        Loading..
    </div>
</template>

<script>
import { fetchData } from '@/functions/Fetcher';

export default {
    setup() {

        const myArray = [];
        console.log(myArray);

        return {}
    },
    data() {
        return {
            listing: [],
            energy: [{ value: "A", color: "#01a54e" }, { value: "B", color: "#4cb848" }, { value: "C", color: "#4cb848" }, { value: "D", color: "#fef102" }, { value: "E", color: "#fcb913" }, { value: "F", color: "#f36e21" }, { value: "G", color: "#ee1d23" }],

        }
    },
    computed: {
        id() {
            return this.$route.params.id;
        },
    },
    mounted() {
        fetchData(`https://api.mediehuset.net/homelands/homes/${this.id}`)
            .then(data => {
                this.listing = data.item;
                console.log(this.listing)
            })
            .catch(error => {
                console.error(error);
            });
    },
}
</script>

<style lang="scss" scoped>
div {
    color: black;

    .Listings-Details-Container {
        position: relative;
        width: 100%;
        height: 50vh;
        background-size: cover;
        background-position: bottom 50% center;
    }

    .Listings-Details-Container__Info {
        position: absolute;
        left: 0;
        right: 0;
        margin: auto;
        width: 80%;
        height: 50%;
        bottom: 10%;
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

.Info__Bottom-Info {
    display: flex;
    justify-content: space-between;
    gap: 10vw;
    margin: 2vw 2vw 0 2vw;
    background-color: red;

    p {
        width: 75%;
    }

    div {
        img {
            width: 100%;
        }
    }

}
</style>