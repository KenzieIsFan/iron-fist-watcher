<script setup>
import {ref, reactive, computed } from 'vue';

//Current issues: render does not work first time its working on a new value, requires some form of refresh to get going(I click on vue web tools and observe the data there to get it going)

    const props = defineProps(['observed_tour','observed_data'])
    //computed
    

  //DATA
    var patchDates = [];
    if (props.observed_tour == "TEKKEN World Tour 2024") {
      patchDates = [{
            value: new Date("02/28/2024"),
            label:"Patch 1.02.01"
          },
          {
            value: new Date("03/29/2024"),
            label:"Patch 1.03.01 (EDDY RELEASE)"
          },
          {
            value: new Date("04/11/2024"),
            label:"Patch 1.03.02"
          },
          {
            value: new Date("04/30/2024"),
            label:"Patch 1.04"
          },
          {
            value: new Date("06/10/2024"),
            label:"Patch 1.05"
          },
          {
            value: new Date("07/22/2024"),
            label:"Patch 1.06 (LIDIA RELEASE)"
          },
          {
            value: new Date("08/06/2024"),
            label:"Patch 1.06.02"
          },
          {
            value: new Date("09/03/2024"),
            label:"Patch 1.07"
          },
          {
            value: new Date("10/01/2024"),
            label:"Patch 1.08 (HEIHACHI RELEASE)"
          },
          {
            value: new Date("10/30/2024"),
            label:"Patch 1.09"
          }
          ]
    }

    const chart = ref(undefined);
    const width = ref(1000);
    const options = reactive ({
        theme: "light2", // "light1", "dark1", "dark2"
        animationEnabled: true, // change to true   
        animationDuration: 3000,
        zoomEnabled: true,
        title:{
          text: "Points Attained this season"
        },
        axisY: {
          title: "Points"
        },
        axisX:{
          //Strip lines used here to indicate where patches for the game may have taken place
          stripLines: patchDates
        },
        data: [{
          type: "line", 
          xValueFormatString: "MMM DD, YYYY",
          markerSize: 0,
          dataPoints: [{x: new Date('01/01/2024'),y:0}]
        }]
      })
    
 
//methods
  

  
    function chartInstance(chart) {
      chart.value = chart;

    }
    function replaceData(newData) {
        options.data[0].dataPoints = newData;
        console.log("replaced")
        chart.render();
        
    }

    const point_total = computed(() => {
      //issue with 
      var total_list = []
      //uses TWT 2024 rules: 1 M+, 2 M, 3 Challengers, 4 Dojos
      const MAX = {'MASTER':2,"CHALLENGER":3,"DOJO":4}
      //Store each tournament placement in here to compare to 
      let applicable_tournaments = {"m+":undefined,"m":[],"c":[],"d":[]}
      let point_copy = props.observed_data
      for ( const t of point_copy.reverse()) {
        console.log(t.date)
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
      replaceData(total_list)
      return total_list;
    })
  

</script>
<template>
	<CanvasJSChart @chart-ref="chartInstance" :options="options" :styles="{width: '80vw', height: '35vh'}"/>
</template>
