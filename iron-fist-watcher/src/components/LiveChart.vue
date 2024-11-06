<script>
export default {
    props: ['observed_tour','point_total'],
  data() {
    return {
      chart: null,
      options: {
        theme: "light2", // "light1", "dark1", "dark2"
        animationEnabled: true, // change to true   
        animationDuration: 3000,
        title:{
          text: "Points Attained this season"
        },
        axisY: {
          title: "Points"
        },
        data: [{
          type: "line", // Change type to "bar", "area", "spline", "pie",etc.
          xValueFormatString: "MMM DD, YYYY",
          yValueFormatString: "#,###.00",
          markerSize: 0,
          dataPoints: this.point_total
        }]
      },
      styleOptions: {
        width: "150%",
        height: "400px"
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
	<CanvasJSChart :options="options"/>
</template>