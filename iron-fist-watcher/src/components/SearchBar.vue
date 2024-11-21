<template>
    <input type="text" v-model="input" placeholder="Search players in TWT..." />
    <div class="searchResults" v-if="input !== ''" >
      <button @click="$emit('change-player', player.name)" v-for="player in searchedPlayers" :key="player">
        {{ player.name }}
      </button>
    </div>
  
 </template>

<script setup>
import { computed, onMounted, reactive, ref } from "vue";
//Later will have to create a way for the 
//players should be an object of name and db id for when it is selected
defineEmits(['change-player']) 
const players = reactive([{name:"Arslan Ash"}, {name:"Ulsan"}]);
let input = ref("");
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

<style>
input {
  width:60%;
}



div .searchResults{
  position: absolute;
  justify-content:end;
  text-align: center;
  left:30%;
  z-index: 2;
  width:50%;
}

.searchResults li {
  background-color: #f09292;
  box-shadow: var(--box-shadow);
  color: #333;
  display: flex;
  max-width: 90%;

  padding: 10px;
  margin: 10px 0;
}

.searchResults button {
  background-color: #f09292;
  box-shadow: var(--box-shadow);
  color: #333;
  display: flex;
  width: 90%;

  padding: 10px;
  margin: 10px 0;
}

</style>