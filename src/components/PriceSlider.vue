<template>
    <div class="price-slider">
        <div class="slider-container">
            <input type="range" min="0" max="100" v-model.number="sliderValue" class="slider">
        </div>
        <div class="price-display">{{ displayPrice }}</div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
    data() {
        return {
            minPrice: 10, // minimum price
            maxPrice: 100, // maximum price
            sliderValue: 50, // default slider value
        }
    },
    computed: {
        // calculate price based on slider value
        displayPrice() {
            const priceRange = this.maxPrice - this.minPrice
            const price = this.minPrice + (priceRange * this.sliderValue) / 100
            return price.toFixed(2)
        }
    },
    methods: {
        ...mapMutations(['setFilteredListings']),
        PriceFilter(e) {
            if (e.target.value != "") {
                this.setFilteredListings(this.$store.state.housingListings.filter(_ => _.type === e.target.value))
            } else {
                this.setFilteredListings(this.$store.state.housingListings)
            }

        }
    }
}
</script>

<style>
.price-slider {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.slider-container {
    width: 200px;
}

.slider {
    -webkit-appearance: none;
    width: 100%;
    height: 10px;
    border-radius: 5px;
    background: #ddd;
    outline: none;
    opacity: 0.7;
    -webkit-transition: .2s;
    transition: opacity .2s;
}

.slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #4caf50;
    cursor: pointer;
}

.slider::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #4caf50;
    cursor: pointer;
}

.price-display {
    margin-top: 20px;
    font-size: 24px;
}
</style>
