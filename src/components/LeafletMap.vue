<template>
    <div :class="modalShow ? 'Modal _Hide' : 'Modal _Show'">
        <div class="Map">
            <l-map :key="`map-${modalShow}-${Math.random()}`" :zoom="zoom" :center="center">
                <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
                <l-marker :lat-lng="center"></l-marker>
            </l-map>
        </div>
        <font-awesome-icon @click="openCloseMap" class="Close" icon="fa-solid fa-circle-xmark" />
    </div>
</template>

<script>
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet';
import "leaflet/dist/leaflet.css";

export default {
    props: {
        lat: {
            type: Number,
            required: true,
        },
        lon: {
            type: Number,
            required: true,
        }
    },
    components: {
        LMap,
        LTileLayer,
        LMarker
    },
    data() {
        return {
            modalShow: false,
            zoom: 16,
            center: [57.0462626, 9.9215263], //default value until component mounts and we have access to our props
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            attribution: '&copy; OpenStreetMap contributors',
        };
    },
    created() { // wait until component has mounted
        this.center = [this.lat, this.lon];
    },
    methods: {
        openCloseMap() {
            this.modalShow = !this.modalShow;
        }
    }
};
</script>

<style scoped lang="scss">
.Modal {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto auto;
    width: 100%;
    overflow: hidden;
    background-color: rgba(32, 32, 32, 0.603);
    z-index: 99;

    .Map {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto auto;

        width: 75vw;
        height: 40vw;
    }

}

.Close {
    position: absolute;
    z-index: 99;
    top: 3.5vw;
    right: 14vw;
    color: white;
    font-size: 2.5vw;
}

._Hide {
    display: block;
}

._Show {
    display: none;
}
</style>
