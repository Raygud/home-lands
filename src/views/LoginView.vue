<template>
    <div>
        <LogInn redirectTo="temp"/>
        
    </div>
</template>

<script>
import LogInn from '@/components/LogInn.vue';

export default {

    setup() {
        return {};
    },
    components: { LogInn },
    computed: {
        authData() {
            return this.$store.state.authData;
        }
    }
}
</script>

<style lang="scss" scoped>

</style>