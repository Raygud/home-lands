<template>
    <div>
        <div class="Grid-Position">

        
        <div class="grid-container">
            <div class="grid-item" v-for="(employee,index) in staff" :key="index" >
                <img :src="employee.image" alt="">
                <div>{{ employee.firstname }} {{ employee.lastname }}</div>
                <div>{{ employee.position }}</div>
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
            staff:[]
        }
    },
    mounted() {
    fetchData("https://api.mediehuset.net/homelands/staff")
      .then(data => {
        this.staff = data.items;
        console.log(this.staff)
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
  grid-template-columns: repeat(4,1fr);
  gap: 4vw;
  width: 85%;
  margin: auto;
.grid-item {
    padding: 1.5vw;
    text-align: left;
    background-color: rgb(255, 255, 255);
    box-shadow: 0.1vw 0.1vw 1vw 0.1vw rgba(0, 0, 0, 0.114);
    border: 1px solid black;
    color: black;
    img{
        width: 100%;
        height: 80%;
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