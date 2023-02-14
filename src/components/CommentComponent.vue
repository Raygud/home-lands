<template>
    <div>

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


</template>

<script>
import { postData } from "@/functions/Fetcher";

export default {
    data() {
        return {
            formData: {
                title: "",
                content: "",
                user_id: "",
                active: false,
                num_stars: 0
            }
        };
    },
    methods: {
        async submitForm() {
            const url = "https://api.mediehuset.net/homelands/reviews";
            const response = await postData(url, this.formData, this.$store.state.authData.access_token);
            console.log(response);
        }
    }
};
</script>

<style scoped lang="scss">
.ReviewSlider {
    width: 100%;
    height: 22vh;
    background-color: #333333;
    display: flex;
    justify-content: center;


    form {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        grid-template-rows: repeat(6, 1fr);
        color: black;
        width: 30%;
        background-color: aqua;

        .Title {
            grid-column: 1/6;
            background-color: red;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            gap: 0.5vw;

            input {
                width: 80%;
                height: 100%;
                box-sizing: border-box;
            }
        }

        .Content {
            grid-column: 1/6;
            grid-row: 2/7;

            background-color: red;
            display: flex;
            justify-content: flex-end;
            align-items: flex-start;
            gap: 0.5vw;

            textarea {
                width: 80%;
                height: 100%;
                box-sizing: border-box;
                resize: none;
            }
        }

        button {
            grid-row: 5/7;
        }
    }
}
</style>