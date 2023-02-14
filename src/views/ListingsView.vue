<template>
    <div>
        <ListingMenu />
        <ListingsComponent />
    </div>
</template>

<script>
import ListingsComponent from '@/components/ListingsComponent.vue';
import ListingMenu from '@/components/ListingMenu.vue';

export default {
    setup() {
        return {};
    },
    components: { ListingsComponent, ListingMenu }
}
</script>

<style lang="scss" scoped>
div {
    margin-top: 5vw;
}
</style>