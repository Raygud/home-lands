<template>
  <div>
    <div class="Image-Slider-Container">
      <div class="Slider" :style="computedStyle">
        <img v-for="(product, index) in images" :key="index" :src="product.image[0]" />
      </div>
      <div class="Arrow-Navigation">

<font-awesome-icon  icon="fa-solid fa-circle-chevron-left" @click="changeSlide('left')" />
<font-awesome-icon class="Flip" icon="fa-solid fa-circle-chevron-left" @click="changeSlide('right')" />

</div>
    </div>
</div>
</template>

<script>

import { fetchData } from '@/functions/Fetcher';

export default {
  data() {
    return {
      position: '-100',
      positionValues: [0, -100, -200],
      images: []


    }
  },
  computed: {
    computedStyle() {
      return {
        left: this.position+"vw"
      }
    }
  },
  methods: {
    SlideMove(event, value) {
      this.position = value
    },
    changeSlide(direction){
      if(direction == "right" && parseInt(this.position ) > -200){
      this.position = parseInt(this.position )- 100
      }
      else if(direction == "left" && parseInt(this.position ) < 0){
        this.position = parseInt(this.position ) + 100
      }
}
    
    
    
  },
  mounted() {
    fetchData("https://api.mediehuset.net/homelands/images")
      .then(data => {
        this.images = data.items.slice(7, 10);
      })
      .catch(error => {
        console.error(error);
      });
  }
}


</script>

<style scoped lang="scss">
.Image-Slider-Container {
  position: relative;
  width: 100%;
  height: 45vw;
  overflow: hidden;
  z-index: 0;
}

.Slider {
  transition: 1000ms ease-in-out;
  position: absolute;
  left: -200vw;
  height: 100%;
  z-index: 100;
  display: flex;
  z-index: 0;
}

img {

  width: 100vw;
}

.Image-Slider-Buttons-Container {
  position: absolute;
  width: 5vw;
  display: flex;
  justify-content: space-evenly;
  z-index: 999;
  bottom: 1vw;
  left: 0;
  right: 0;
  margin: auto;
}

button {
  width: 1vw;
  height: 1vw;
  background-color: white;
  border: none;
  border-radius: 50%;
  transition: 100ms ease-in-out;
}

.currentButton {
  background-color: black;
}

.Arrow-Navigation {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        width: 90%;
        height: 100%;
        margin: auto auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 2.5vw;
        color: white;
        user-select: none;

        .Flip {
            transform: scale(-1, 1);

        }
    }
</style>