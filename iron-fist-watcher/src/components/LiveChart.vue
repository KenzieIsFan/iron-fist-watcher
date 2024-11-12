<script>
export default {
    props: ['observed_tour','point_total'],

  data() {
    var patchDates = []
    if (this.observed_tour == "TEKKEN World Tour 2024") {
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
    return {
      width:1000,
      chart: null,
      options: {
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
          dataPoints: this.point_total
        }]
      }
    }
  },
  methods: {
    chartInstance(chart) {
      this.chart = chart;
    }
  }
}

</script>
<template>
	<CanvasJSChart :options="options" :styles="{width: '80vw', height: '360px'}"/>
</template>
