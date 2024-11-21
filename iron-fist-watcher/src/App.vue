<template>
  <div class="vert">
  <div>
  <h3>Iron Fist Watcher <span>|| Observing: {{ observed_players }}</span></h3>
  <Header v-model:observed_players="observed_players" v-model:observed_tour="observed_tour" />
  
  
   
  </div>
  <div><Ranking :data="observed_data"></Ranking></div>
    
    <LiveChart class="chart" :observed_tour="observed_tour" :point_total="point_total" />
  
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


const observed_data = reactive([{"class": "MASTER","title":"EVO89","date": "07/31/2024","rank":1,"points":800},{"class": "MASTER","title":"EVO","date": "07/19/2024","rank":1,"points":800}, {"class": "MASTER","title":"EVO-1","date": "07/01/2024","rank":3,"points":500},{"class": "DOJO 96+","title":"HAVOC 5","date": "05/13/2024","rank":10,"points":10},{"class": "DOJO 48","title":"HAVOC 4","date": "04/16/2024","rank":12,"points":6},{"class": "DOJO 96+","title":"HAVOC 3","date": "04/13/2024","rank":13,"points":5}])
const observed_players = ref("Arslan Ash") //Will be to see which players are to be observed {name:String, points:[tourney_name1:INT,tourney_name2:INT]}
const observed_tour = ref("TEKKEN World Tour 2024")//Will ensure the right data for that tournament is being observed.

//I will need to make this optimised and readable later
const point_total = computed(() => {
  var total_list = []
  //uses TWT 2024 rules: 1 M+, 2 M, 3 Challengers, 4 Dojos
  const MAX = {'MASTER':2,"CHALLENGER":3,"DOJO":4}
  //Store each tournament placement in here to compare to 
  var applicable_tournaments = {"m+":undefined,"m":[],"c":[],"d":[]}
  const point_copy = observed_data
 
  for ( const t of point_copy.reverse() ) {
    //need to optimise how code works here to reduce code lines
    switch (t.class) {
    case "MASTER+" : {
      if (applicable_tournaments["m+"] != undefined){
        const mptourn = applicable_tournaments['m+'];
        if (mptourn.rank <= t.rank ) {
          applicable_tournaments['m+'] = t
          break;
        } 
      } else{
        applicable_tournaments['m+'] = t
        break;
      }
    } 

    case "MASTER" : {
      const mtourn = applicable_tournaments['m'];
      if (mtourn.length < MAX.MASTER){
        mtourn.push(t);
        if (mtourn.length >=2){
          mtourn.sort((a,b) => a.rank - b.rank);
        }
      } else{
        const lowest = mtourn[MAX.MASTER-1]
        if (lowest.rank > t.rank){
          mtourn[MAX.MASTER-1] = t;
          mtourn.sort((a,b) => a.rank - b.rank);
        }
      }
      applicable_tournaments['m'] = mtourn;
      break;

    }
    
    case "CHALLENGER": {
      const ctourn = applicable_tournaments['c'];
      if (ctourn.length < MAX.CHALLENGER){
        ctourn.push(t);
        if (ctourn.length >=2){
          ctourn.sort((a,b) => a.rank - b.rank);
        }
      } else{
        const lowest = ctourn[MAX.CHALLENGER-1]
        if (lowest.rank > t.rank){
          ctourn[MAX.CHALLENGER-1] = t;
          ctourn.sort((a,b) => a.rank - b.rank);
        }
      }
      applicable_tournaments['c'] = ctourn;
      break;
    }
    default :{
      const dtourn = applicable_tournaments['d'];
      if (dtourn.length < MAX.DOJO){
        dtourn.push(t);
        if (dtourn.length >=2){
          dtourn.sort((a,b) => a.points - b.points);
        }
      } else{
        const lowest = dtourn[MAX.DOJO-1]
        if (lowest.points > t.points){
          dtourn[MAX.DOJO-1] = t;
          dtourn.sort((a,b) => a.points - b.points);
        }
      }
      
      applicable_tournaments['d'] = dtourn;
    }
  }
  //{ x: tournament date, y: total point accumulation }
  var total = 0
  if (applicable_tournaments["m+"] != undefined){
    const mp = applicable_tournaments["m+"];
    total = total + mp.points;
  }
  if (applicable_tournaments["m"].length != 0){
    const m = applicable_tournaments["m"];
    for (const mt of m) {

      total = total + mt.points;
    }
  }
  if (applicable_tournaments["c"].length != 0){
    const c = applicable_tournaments["c"];
    for (const ct of c) {
      total = total + ct.points;
    }
  }
  if (applicable_tournaments["d"].length != 0){
    const d = applicable_tournaments.d;
    for (const dt of d) {
      total = total + dt.points;
    }
  }
  total_list.push({label: t.name, x: new Date(t.date),y:total})
}
  return total_list;

})

</script>