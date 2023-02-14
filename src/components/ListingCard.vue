<template>
    <div class="grid-item" v-if="Listing">
        <router-link class="Logo" :to="`/boliger-til-salg/${Listing.id}`">
            <img :src="Listing.images[0].filename.medium" alt="">
            <h2>{{ Listing.address }}</h2>
            <ol>
                <li>{{ Listing.zipcode }}</li>
                <li>{{ Listing.type }}</li>
                <li>
                    <ol>

                        <li
                            v-bind:style="{ 'background-color': energy.find(item => item.value === Listing.energy_label_name).color }">
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


}
</script>

<style lang="scss" scoped>
.grid-item {
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
                background-color: greenyellow;
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
</style>