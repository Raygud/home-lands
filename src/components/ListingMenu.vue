<template>
    <div>
        <h1>Boliger til salg</h1>
        <PriceSlider />
        <select id="Sort" name="Sort" @change="TypeFilter">
            <option value="" selected>Sorter efter type</option>
            <option value="Villa">Villa</option>
            <option value="Ejerlejlighed">Ejerlejlighed</option>
            <option value="Andelsbolig">Andelsbolig</option>
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
            if (e.target.value != "") {
                this.setFilteredListings(this.$store.state.housingListings.filter(_ => _.type === e.target.value))
            } else {
                this.setFilteredListings(this.$store.state.housingListings)
            }

        }
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