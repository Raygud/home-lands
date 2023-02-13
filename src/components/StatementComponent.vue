<template>
    <div class="Statement-Container">

        <h2>{{ Title }}</h2>
        <p>{{ Message }}</p>
    </div>

</template>

<script>
export default {
    props: {
        Title: {
            type: String,
            required: true
        },
        Message: {
            type: String,
            required: true
        }
    },
    setup() {


        return {

        }
    }
}
</script>

<style scoped>
@font-face {
    font-family: Lobster;
    src: url('~@/assets/Fonts/Lobster.otf');
}

.Statement-Container {
    width: 45vw;
    margin: auto;
    margin-top: 3vw;
}

h2 {
    margin-bottom: 3vw;
    font-family: Lobster;
    font-size: 2vw;
    font-weight: 100;
}
</style>