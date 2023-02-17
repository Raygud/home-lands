<template>
    <div>
        <div class="Grid-Position">
            <div class="grid-container">
                <ListingCard v-for="(offer, index) in offers" :key="index" :Listing="offer" />
            </div>Your
        </div>
</div>
</template>

<script>











import { fetchData } from '@/functions/Fetcher';
import { Rand } from '@/functions/RandomInt';

import ListingCard from './ListingCard.vue';

export default {
    setup() {
        return {};
    },
    data() {
        return {
            offers: []
        };
    },
    mounted() {
        fetchData("https://api.mediehuset.net/homelands/homes")
            .then(data => {
                const randomInt = Rand(0, 8)
                console.log(randomInt + " " + (randomInt + 2))
                this.offers = data.items.slice(randomInt, randomInt + 3);
            })
            .catch(error => {
                console.error(error);
            });
    },
    components: { ListingCard }
}
</script>

<style lang="scss" scoped>
.Grid-Position {
    position: relative;
    height: 42vh;
}

.grid-container {
    position: absolute;
    top: -15%;
    left: 0;
    right: 0;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 4vw;
    width: 85%;
    margin: auto;
}
</style>