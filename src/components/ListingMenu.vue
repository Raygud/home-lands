<template>
    <div>
        <h1>Boliger til salg</h1>
        <PriceSlider />
        <select id="Sort" name="Sort" @change="TypeFilter">
            <option value="" selected>Sorter efter type</option>
            <option value="Villa">Villa</option>
            <option value="Ejerlejlighed">Ejerlejlighed</option>
            <option value="Andelsbolig">Andelsbolig</option>
            <option value="Favorit">Favorit</option>
        </select>
    </div>
</template>

<script>













import PriceSlider from "@/components/PriceSlider.vue"
import { mapMutations } from 'vuex';

export default {
    setup() {


        return {}
    },
    components: { PriceSlider },
    methods: {
        ...mapMutations(['setFilteredListings']),
        TypeFilter(e) {
            if (e.target.value != "") { //get value from selected and check if listing.type is = to that value
                this.setFilteredListings(this.$store.state.housingListings.filter(_ => _.type === e.target.value))
            } else {
                // if selected has no value revert to all listings
                this.setFilteredListings(this.$store.state.housingListings)
            }
            if (e.target.value === "Favorit") {
                    // if listing = favorit map over all favorite listings returning an array of all the ids, then check if the listing.id exists in the favorites array
                const favoriteHomeIds = this.$store.state.favoriteListings.map(listing => listing.home_id)
                const filteredListings = this.$store.state.housingListings.filter(listing => favoriteHomeIds.includes(listing.id))
                this.setFilteredListings(filteredListings)
            }
        },
    }
}
</script>

<style lang="scss" scoped>
div {
    width: 85%;
    margin: auto;
    display: flex;
    justify-content: space-between;
    height: 2vw;
    color: black;
}

h1 {
    color: black;
    width: 100%;
    text-align: left;
}
</style>