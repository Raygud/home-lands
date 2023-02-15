<template>
    <div :class="modalShow ? 'Modal _Hide' : 'Modal _Show'">
        <img :src="Images.floorplan" alt="">
        <font-awesome-icon @click="openCloseFloor" class="Close" icon="fa-solid fa-circle-xmark" />

        <div class="Arrow-Navigation">



        </div>
    </div>

</template>

<script>
export default {
    setup() {


        return {}
    },
    data() {
        return {
            activeImg: 0,
            modalShow: false
        }
    },
    props: {
        Images: {
            type: Object,
            required: true
        }

    },
    methods: {

        openCloseFloor() {
            this.modalShow = !this.modalShow
        }
    }
}
</script>

<style lang="scss" scoped>
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

    img {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto auto;
        -webkit-tap-highlight-color: transparent;
        width: 65%;
        max-height: 80%;
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