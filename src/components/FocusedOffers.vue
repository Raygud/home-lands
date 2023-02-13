<template>
    <div>
        <div class="Grid-Position">

        
        <div class="grid-container">
            <div class="grid-item" v-for="(offer,index) in offers" :key="index" >
            <img :src="offer.images[0].filename.medium" alt="">
                <h2>{{ offer.address }}</h2>
                <ol>
                    <li>{{ offer.zipcode }}</li>
                    <li>{{ offer.type }}</li>
                    <li>
                        <ol>
                            
                            <li v-bind:style="{ 'background-color': energy.find(item => item.value === offer.energy_label_name).color }">{{ offer.energy_label_name }}</li>                        
                            <li>værelser {{ offer.num_rooms }},</li>
                            <li>{{ offer.floor_space }} m&sup2;</li>
                            <li >{{ offer.price.substr(0,1) }}.{{ offer.price.substr(1,3) }}.{{ offer.price.substr(4,offer.price.length) }} DKK</li>
                        </ol>
                        
                    </li>
                </ol>
            </div>
        </div>
    </div>
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
            energy:[{value:"A",color:"#01a54e"},{value:"B",color:"#4cb848"},{value:"C",color:"#4cb848"},{value:"D",color:"#fef102"},{value:"E",color:"#fcb913"},{value:"F",color:"#f36e21"},{value:"G",color:"#ee1d23"}],
            offers:[]
        }
    },
    mounted() {
    fetchData("https://api.mediehuset.net/homelands/homes")
      .then(data => {
        this.offers = data.items.slice(0,3);
        console.log(this.images.items[0].filename)
      })
      .catch(error => {
        console.error(error);
      });
  }
}
</script>

<style lang="scss" scoped>

.Grid-Position{
    position: relative;
    height: 42vh;
}
.grid-container {
    position: absolute;
    top: -15%;
    left: 0;
    right: 0;
  display: grid;
  grid-template-columns: repeat(3,1fr);
  gap: 4vw;
  width: 85%;
  margin: auto;
.grid-item {
    padding: 1.5vw;
    text-align: left;
    background-color: rgb(255, 255, 255);
    box-shadow: 0.1vw 0.1vw 1vw 0.1vw rgba(0, 0, 0, 0.114);
    color: black;
    img{
        width: 100%;
    }
    li:last-child {
    ol{
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        gap: 0.2vw;
        li:first-child{
            display: flex;
            justify-content: center;
            align-items: center;
            width: 2vw;
            background-color: greenyellow;
            aspect-ratio: 1/1;
            color: white;
            font-weight: bolder;
        }
        li:last-child {
            margin-left: auto;
        }
    }
}
}
}

</style>