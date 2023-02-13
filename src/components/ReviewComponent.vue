<template>
    <div v-if="reviews.user">

        <div>
        <h3>{{ reviews.title }}</h3>
        <p>"{{ reviews.content }}"</p>
    </div>
    <ol>
        <li>{{ reviews.user.firstname }} {{ reviews.user.lastname }}</li>
        <li>{{ new Date(parseInt(reviews.created*1000)).toLocaleString("default", {month: "long"}) }} {{ new Date(parseInt(reviews.created*1000)).getFullYear() }}</li>
    </ol>

    </div>
    <div v-else>
        loading..
    </div>
    
</template>

<script>
  import { fetchData } from '@/functions/Fetcher';

export default {
    setup () {
        

        return {}
    },
    data(){
        return{
            reviews:[]

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
  }
}
</script>

<style lang="scss" scoped>

div{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height:15vw;
    background-color: #FED9C9;
    color: black;
    gap: 0.2vw;
    padding-bottom: 2vw;
    h3{
        font-size: 2vw;
    }
    p{
        width: 80%;
    }

    ol{
        display: flex;
        gap: 1vw;
    }
}

</style>