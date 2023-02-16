<template>
    <div class="Main-Container">

        <div class="Administration-Container">
            <h2>Administration</h2>
            <ol>
                <li>Titel</li>
                <li>Dato</li>
                <li>Handling</li>
            </ol>
            <ol v-for="(review, index) in reviews" :key="index">
                <li>{{ review.title }}</li>
                <li>{{ new Date(parseInt(review.created * 1000)).toLocaleString("default", {
                    day: 'numeric', month: "long",
                    year: 'numeric'
                })

                }}</li>
                <li><button><router-link :to="`/Profile/Review/${review.id}`">Rediger</router-link></button> <button
                        @click="deleteReview(review.id)">Slet</button></li>
            </ol>
        </div>
        <div class="Log-Out">
            <p>Du er logget ind som {{ this.$store.state.authData.user.firstname }}</p>
        </div>

</div>
</template>

<script>





import { fetchData, postData, deleteData } from '@/functions/Fetcher';

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
        }
    },
    mounted() {
        this.getData()
    },
    methods: {
        async submitForm() {
            const url = "https://api.mediehuset.net/homelands/reviews";
            const response = await postData(url, this.formData, this.$store.state.authData.access_token);
            console.log(response);
        },
        reviewSlide() {
            this.isActive = !this.isActive
        },
        deleteReview(reviewId) {
            const isConfirmed = confirm("Do you want to continue?");
            if (isConfirmed) {
                deleteData(`https://api.mediehuset.net/homelands/reviews/${reviewId}`, this.$store.state.authData.access_token)
                    .then(data => {
                        console.log(data)
                        this.getData()
                    })
                    .catch(error => {
                        console.error(error);
                    })
            } else {
                return

            }
        },
        getData() {
            fetchData("https://api.mediehuset.net/homelands/reviews")
                .then(data => {
                    this.reviews = data.items.filter(item => item.user_id == this.$store.state.authData.user_id)
                    console.log(this.reviews)
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
    display: flex;
    gap: 8vw;
    margin: auto;
    margin-top: 8vw;
    width: 90%;
}

.Administration-Container {
    display: flex;
    flex-direction: column;
    color: black;
    width: 80%;
    text-align: left;

    ol {
        display: flex;
        justify-content: space-between;
        align-items: center;

        li {
            width: 100%;
            border-bottom: 1px solid #707070;
            padding: 0.3vw;
        }

        li:last-child {
            width: 20%;

            button {
                border: none;
                background-color: rgba(255, 255, 255, 0);
                color: #339900;
            }

            button:last-child {
                color: #FF0000;
            }
        }
    }
}

.Log-Out {
    width: 20%;
    border-left: 1px solid #707070;
    color: black;
    height: 70vh;
}
</style>