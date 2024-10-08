<template>
  <Header :observed_players="observed_players" :observed_tour="observed_tour"/>
  <div class="container">
    <LiveChart />
  </div>
</template>



<script setup>
import Header from "./components/Header.vue"
import LiveChart from "./components/LiveChart.vue"

import {ref} from 'vue';
// ref makes the variables work and react on a global app scale
const observed_players = ref([]) //Will be to see which players are to be observed
const observed_tour = ref("")//Will ensure the right data for that tournament is being observed.

</script>