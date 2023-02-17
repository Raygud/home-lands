<template>
    <div>
        <label for="priceSlider">Sorter efter prisniveau</label>
        <div>
            <p>{{ this.priceMin }}</p>
            <div class="Slider-Positioning">
                <div>
                    <input v-on:input="Min" type="range" min="0" max="8000000" value="0" step="1000" class="slider"
                        id="priceSliderMin">
                </div>
                <div>
                    <input v-on:input="Max" type="range" min="0" max="8000000" value="8000000" step="1000" class="slider"
                        id="priceSliderMax">
                </div>


            </div>
            <p>{{ this.priceMax }}</p>
        </div>
</div>
</template>

<script>

import { mapMutations } from 'vuex';
export default {

    setup() {


        return {}
    },
    data() {
        return {
            priceMax: 8000000,
            priceMin: 0
        }
    },
    methods: {
        Min(e) {
            this.priceMin = e.target.value
            this.priceFilter()
        },
        Max(e) {
            this.priceMax = e.target.value
            this.priceFilter()
        },
        ...mapMutations(['setFilteredListings']),
        priceFilter() {
            if (this.priceMax > 0 || this.priceMin) {
                this.setFilteredListings(this.$store.state.housingListings.filter(_ => parseInt(_.price) >= this.priceMin && parseInt(_.price) <= this.priceMax))
            } else {
                this.setFilteredListings(this.$store.state.housingListings)
            }

        }
    }
}
</script>

<style lang="scss" scoped>
div {
    width: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1vw;
}

.Slider-Positioning {
    position: relative;
    height: 1vw;
    width: 30%;
    margin: 3vw;

    input[type='range'] {
        position: absolute;
    }

    input[type=range] {
        -webkit-appearance: none;
        width: 100%;
        height: 20px;
        border-radius: 10px;
        background-color: transparent;
    }

    input[type=range]:focus {
        outline: none;
    }

    input[type=range]::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 1vw;
        height: 1vw;
        border-radius: 50%;
        margin-bottom: 2vw;
        background-color: white;
        border: 1px solid black;
        cursor: pointer;
    }

    input[type=range]::-webkit-slider-thumb {
        position: relative;
        left: calc(-0.5 * (1vw - 20px));
    }

    input[type=range]::-webkit-slider-runnable-track {
        height: 2px;
        background-color: black;
        border-radius: 5px;
    }



}
</style>