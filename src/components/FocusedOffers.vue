<template>
    <div>
        <div class="Grid-Position">
            <div class="grid-container">
                <ListingCard v-for="(offer, index) in offers" :key="index" :Listing="offer" />
            </div>
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

.grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px,1fr));
    gap: 4vw;
    max-width: 85%;
    margin: auto;
    margin-top: -10%;
}
</style>