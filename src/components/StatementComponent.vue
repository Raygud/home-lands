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

.Statement-Container {
    width: 45vw;
    margin: auto;
    margin-top: 3vw;
}

h2 {
    margin-bottom: 3vw;
    font-size: 2vw;
    font-weight: 100;
    color: black;
}
</style>