<template>
    <div>
        <div class="Grid-Position">


            <div class="grid-container">
                <div class="grid-item" v-for="(employee, index) in staff" :key="index">
                    <img :src="employee.image" alt="">
                    <div class="Staff-Hover-Container">
                        <div class="Staff-Info">
                            <h3>{{ employee.firstname }} {{ employee.lastname }}</h3>
                            <div>{{ employee.position }}</div>
                        </div>
                        <div class="Staff-Contact">
                            <div>Email: {{ employee.email }}</div>
                            <div>Mobil: {{ employee.phone }}</div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import { fetchData } from '@/functions/Fetcher';

export default {
    setup() {


        return {}
    },
    data() {
        return {
            energy: [{ value: "A", color: "#01a54e" }, { value: "B", color: "#4cb848" }, { value: "C", color: "#4cb848" }, { value: "D", color: "#fef102" }, { value: "E", color: "#fcb913" }, { value: "F", color: "#f36e21" }, { value: "G", color: "#ee1d23" }],
            staff: []
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
.Grid-Position {
    position: relative;
}

.grid-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2vw;
    width: 85%;
    margin: auto;
    margin-bottom: 4vw;

    .grid-item {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        text-align: left;
        background-color: rgb(255, 255, 255);
        box-shadow: 0.1vw 0.1vw 1vw 0.1vw rgba(0, 0, 0, 0.114);
        border: 1px solid black;
        color: black;
        overflow: hidden;

        img {
            width: 100%;
            aspect-ratio: 1/1.2;
        }

        li:last-child {
            ol {
                display: flex;
                justify-content: space-between;
                align-items: flex-end;
                gap: 0.2vw;

                li:first-child {
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

        &:hover {
            .Staff-Hover-Container {
                background-color: rgba(0, 0, 0, 0.479);
                color: white;
            }

            .Staff-Contact {
                height: 2vw;
                overflow: hidden;
            }
        }
    }
}

.Staff-Hover-Container {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding-left: 1vw;
    background-color: rgba(255, 255, 255, 0.74);
    transition: 300ms ease-in-out;

    .Staff-Info {
        padding-top: 0.3vw;
        padding-bottom: 0.3vw;

        h3 {

            padding-bottom: 0.3vw;
        }
    }

    .Staff-Contact {
        transition: 300ms ease-in-out;
        height: 0vw;
        overflow: hidden;
    }
}
</style>