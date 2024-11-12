<template>
    <input type="text" v-model="input" placeholder="Search players in TWT..." />
    <div v-if="input !== ''" >
      <div  v-for="player in searchedPlayers" :key="player">
        <p>{{ player }}</p>
      </div>
    </div>
 </template>

<script setup>
import { computed, onMounted, reactive, ref } from "vue";
//Later will have to create a way for the 
//players should be an object of name and db id for when it is selected 
const players = reactive([{name:"apple"}, {name:"banana"}, {name:"orange"}]);
let input = ref("");
console.log(players)
const searchedPlayers = computed(() => {
      return players.filter((player) => {
        return (
          player.name
            .toLowerCase()
            .indexOf(input.value.toLowerCase()) != -1
        );
      });
});
</script>