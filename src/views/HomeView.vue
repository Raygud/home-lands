<template>
  <div class="home">
    <ImageSlider/>
    <FocusedOffers/>
  </div>
</template>

<script>
// @ is an alias to /src
import FocusedOffers from '@/components/FocusedOffers.vue';
import ImageSlider from '@/components/ImageSlider.vue';

export default {
  name: 'HomeView',
  components: {
    ImageSlider,
    FocusedOffers
}
}
</script>
