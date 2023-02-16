<template>
    <div class="ReviewPreview" v-if="reviews.user">
        <div class="Center-Review">
            <h3>{{ reviews.title }}</h3>
            <p>"{{ reviews.content }}"</p>
        </div>
        <ol>
            <li>{{ reviews.user.firstname }} {{ reviews.user.lastname }}</li>
            <li>{{ new Date(parseInt(reviews.created * 1000)).toLocaleString("default", { month: "long" }) }} {{
                new
                    Date(parseInt(reviews.created * 1000)).getFullYear()
            }}</li>
        </ol>

        <div :class="isActive ? 'ReviewSlider open' : 'ReviewSlider closed'">
            <div class="Slider-Button" @click="reviewSlide">
                <font-awesome-icon class="Slider-Button__Icon" icon="fa-solid fa-chevron-left" />
            </div>
            <form>
                <div class="Title">
                    <label for="title">Titel:</label>
                    <input type="text" id="title" v-model="formData.title" required="true" />
                </div>
                <div class="Content">
                    <label for="content">Content:</label>
                    <textarea id="content" v-model="formData.content" required="true"></textarea>
                </div>
                <button @click.prevent="submitForm">Submit</button>
            </form>
        </div>
    </div>
    <div v-else>
        loading..
</div>
</template>

<script>

import { fetchData } from '@/functions/Fetcher';
import { postData } from "@/functions/Fetcher";

export default {
    setup() {


        return {}
    },
    data() {
        return {
            reviews: [],
            formData: {
                title: "",
                content: "",
                user_id: "",
                active: false,
                num_stars: 0
            },
            isActive: false

        }
    },
    mounted() {
        fetchData("https://api.mediehuset.net/homelands/reviews")
            .then(data => {
                this.reviews = data.items.find(item => item.id == 490)
                console.log(this.reviews.user.firstname)
            })
            .catch(error => {
                console.error(error);
            });
    },
    methods: {
        async submitForm() {
            const url = "https://api.mediehuset.net/homelands/reviews";
            const response = await postData(url, this.formData, this.$store.state.authData.access_token);
            console.log(response);
        },
        reviewSlide() {
            this.isActive = !this.isActive
        }
    }
}
</script>

<style lang="scss" scoped>
.ReviewPreview {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 20vh;
    background-color: #FED9C9;
    color: black;
    gap: 0.5vw;
    padding-bottom: 2vw;
    padding-top: 1.5vw;
    overflow: hidden;

    .Center-Review {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }



    h3 {
        font-size: 2vw;
    }

    p {
        width: 80%;
    }

    ol {
        display: flex;
        gap: 1vw;
    }
}

.ReviewSlider {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: #333333;
    display: flex;
    justify-content: center;
    z-index: 999;
    transition: 350ms ease-in-out;
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;

    form {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        grid-template-rows: repeat(6, 1fr);
        color: black;
        width: 30%;
        padding: 2vw;
        gap: 1vw;

        .Title {
            grid-column: 1/6;
            grid-row: 1/4;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            gap: 0.5vw;
            padding-bottom: 2vw;

            input {
                width: 80%;
                height: 100%;
                box-sizing: border-box;
                border-radius: 5px;
                border: none;
            }
        }

        .Content {
            grid-column: 1/6;
            grid-row: 3/7;

            display: flex;
            justify-content: flex-end;
            align-items: flex-start;
            gap: 0.5vw;

            textarea {
                width: 80%;
                height: 100%;
                box-sizing: border-box;
                resize: none;
                border-radius: 5px;
                border: none;
            }
        }

        button {
            grid-row: 5/7;
            border-radius: 7px;
            border: none;
        }
    }

    .Slider-Button {
        position: absolute;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        padding-left: 1vw;
        left: 0;
        top: 0;
        width: 5%;
        height: 100%;
        background-color: #252525;
        border-top-left-radius: 15px;
        border-bottom-left-radius: 15px;

        .Slider-Button__Icon {
            color: rgba(255, 255, 255, 0.425);
            transition: 350ms ease-in-out;
            font-size: 2.5vw;

        }
    }
}

.open {
    right: 0%;

    .Slider-Button__Icon {
        color: rgba(255, 255, 255, 0.425);
        transition: 350ms ease-in-out;
        font-size: 2.5vw;

        transform: scale(-1, 1);
    }

}

.closed {
    right: -95%;

    .Slider-Button__Icon {
        color: rgba(255, 255, 255, 0.425);
        transition: 350ms ease-in-out;
        font-size: 2.5vw;

        transform: scale(1, 1);
    }

}
</style>