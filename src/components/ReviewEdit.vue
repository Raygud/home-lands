<template>
    <div class="Main-Container">
        <router-link :to="`/Profile`" class="Back-To-Home"><font-awesome-icon class="Icon"
                icon="fa-solid fa-circle-chevron-left" /></router-link>
        <div class="Administration-Container">
            <h2>Rediger</h2>
            <ol>
                <li><input type="text" v-model="formData.title"></li>
                <li> <textarea type="text" v-model="formData.content">  </textarea></li>
                <li><button>Annuler</button><button @click="updateData">Gem</button> </li>
            </ol>
        </div>
        <div class="Log-Out">
            <p>Du er logget ind som {{ this.$store.state.authData.user.firstname }}</p>
        </div>

</div>
</template>

<script>














import { fetchData, patchData } from '@/functions/Fetcher';

export default {
    setup() {


        return {}
    },
    data() {
        return {
            formData: {
                id: "",
                title: "",
                content: "",
                num_stars: 3,
                active: 1
            },
        }
    },
    mounted() {
        this.getData()
    },
    computed: {
        id() {
            return this.$route.params.id;
        },
    },
    methods: {
        getData() {
            fetchData(`https://api.mediehuset.net/homelands/reviews/${this.id}`, this.$store.state.authData.access_token)
                .then(data => {
                    this.review = data;
                    this.formData.title = this.review.title;
                    this.formData.content = this.review.content;
                    this.formData.id = this.id;

                })
                .catch(error => {
                    console.error(error);
                });
        },
        updateData() {
            patchData(`https://api.mediehuset.net/homelands/reviews`, this.formData, this.$store.state.authData.access_token)
                .then(data => {
                    this.review = data
                    console.log(this.review)
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }
}
</script>

<style lang="scss" scoped>
.Main-Container {
    position: relative;
    display: flex;
    gap: 8vw;
    margin: auto;
    margin-top: 8vw;
    padding-top: 5vw;
    width: 90%;
    color: black;

    .Administration-Container {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        color: black;
        width: 80%;

        ol {
            width: 100%;

            li:last-child {
                margin-top: 1vw;
                width: 100%;
                display: flex;
                justify-content: flex-end;
                gap: 0.5vw;
            }
        }

        input {
            box-sizing: border-box;
            border: none;
            background-color: #70707000;
            width: 100%;
            font-size: 1.5vw;
            margin: 1vw 0 1vw 0;
            border: 2px solid #000000;
            padding: 0.5vw;
            border-radius: 6px;

            &::placeholder {
                color: rgb(0, 0, 0);
                opacity: 1;
            }
        }

        textarea {
            box-sizing: border-box;

            background-color: #70707000;
            border: 2px solid #000000;
            padding: 0.5vw;
            border-radius: 6px;
            resize: none;
            width: 100%;
            height: 10vw;
        }

        button {
            background-color: #000000;
            color: white;
            padding: 0.5vw;
            font-size: 1.2vw;
            border-radius: 6px;
        }
    }
}


.Log-Out {
    width: 30%;
    border-left: 1px solid #707070;
    color: black;
    height: 70vh;
}


.Back-To-Home {
    position: absolute;
    left: 0;
    top: 0;
    font-size: 3vw;
}
</style>