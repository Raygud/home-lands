<template>
    <div :class="modalShow ? 'Modal _Hide' : 'Modal _Show'">
        <img :class="activeImg == index ? '_Hide' : '_Show'" v-for="(image, index) in Images" :key="index"
            :src="image.filename.large" alt="">
        <font-awesome-icon @click="openCloseModal" class="Close" icon="fa-solid fa-circle-xmark" />

        <div class="Arrow-Navigation">

            <font-awesome-icon icon="fa-solid fa-circle-chevron-left" @click="flipImg('left')" />
            <font-awesome-icon class="Flip" icon="fa-solid fa-circle-chevron-left" @click="flipImg('right')" />

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
            type: Array,
            required: true,
            default: () => []
        }

    },
    methods: {
        flipImg(direction) {
            if (direction == "right" && this.activeImg != this.Images.length - 1) {
                this.activeImg = this.activeImg + 1
            }
            if (direction == "left" && this.activeImg != 0) {
                this.activeImg = this.activeImg - 1
            }
        },
        openCloseModal() {
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
        max-height: 99%;
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