<template>
    <div v-if="listing.images">
        <div :style="{ backgroundImage: 'url(' + listing.images[0].filename.large + ')' }"></div>
        {{ id }}
    </div>

    <div v-else>
        Loading..
    </div>
</template>

<script>
import { fetchData } from '@/functions/Fetcher';

export default {
    setup() {

        return {}
    },
    data() {
        return {
            listing: []
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

    div {
        width: 100%;
        height: 50vh;
        background-size: cover;
        background-position: bottom 50% center;
    }
}
</style>