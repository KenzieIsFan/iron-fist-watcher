<template>
  <div class="vert">
  <div>
  <h3>Iron Fist Watcher <span>|| Observing: {{ observed_players }}</span></h3>
  <Header @change-player="changePlayer" v-model:observed_tour="observed_tour" />
  </div>
  <div class="table"><Ranking :data="observed_data"></Ranking></div>
  <div  class="chart"><LiveChart  :observed_tour="observed_tour" :observed_data="observed_data" /></div>
    
  </div>
</template>



<script setup>
import Header from "./components/Header.vue"
import LiveChart from "./components/LiveChart.vue"
import Ranking  from "./components/Ranking.vue"
import {computed, ref,reactive} from 'vue';
// ref makes the variables work and react on a global app scale
//observed_data will be used in conjunction with updates from server side so has to be introduced here
//will use the changes in data here to set historical point totals for each tournament played
//{"class": "MASTER","title":"EVO","date": new Date("07/19/2024"),"rank":1,"points":800}
//expecting data to be in descending order of 

//Object.assign(reactiveData, NewData) #Use this to replace the array in observed_data

const observed_data = ref([])
const observed_players = ref("") //Will be to see which players are to be observed
const observed_tour = ref("TEKKEN World Tour 2024")//Will ensure the right data for that tournament is being observed.

//point_total converts the data in observed_data into something that can be read by the CanvasJs chart

function changePlayer(chosenPlayer){
  if (chosenPlayer !== observed_players.value) {
    observed_players.value = chosenPlayer;
    fetch('/api/getData?'+ new URLSearchParams({
      'player': chosenPlayer
      }).toString()).then((r) => r.json())
      .then(({ data }) => {

      observed_data.value = data
      });
  
  }
  
}

</script>