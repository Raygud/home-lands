<template>
        <div class="grid-container">
            <ListingCard v-for="(offer, index) in filteredData" :key="index" :Listing="offer" />

        </div>
</template>

<script>









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
    components: { ListingCard },
    computed: {
        listingsData() {
            return this.$store.state.housingListings;
        },
        filteredData() {
            return this.$store.state.filteredListings;
        },
        
    }
}
</script>

<style lang="scss" scoped>
.grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px,1fr));
    gap: 4vw;
    width: 85%;
    margin: auto;
}

</style>