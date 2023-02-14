<template>
  <div class="home">
    <ImageSlider />
    <FocusedOffers />
    <StatementComponent Title="Det siger kunderne:" />
    <ReviewComponent />
    <StatementComponent Title="Mød vores ansatte:" />
    <OurStaff />
  </div>
</template>

<script>
// @ is an alias to /src
import FocusedOffers from '@/components/FocusedOffers.vue';
import ImageSlider from '@/components/ImageSlider.vue';
import OurStaff from '@/components/OurStaff.vue';
import ReviewComponent from '@/components/ReviewComponent.vue';
import StatementComponent from '@/components/StatementComponent.vue';

export default {
  name: 'HomeView',
  components: {
    ImageSlider,
    FocusedOffers,
    StatementComponent,
    ReviewComponent,
    OurStaff
  }
}
</script>
