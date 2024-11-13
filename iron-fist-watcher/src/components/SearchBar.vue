<template>
    <input type="text" v-model="input" placeholder="Search players in TWT..." />
    <div class="searchResults" v-if="input !== ''" >
      <li  v-for="player in searchedPlayers" :key="player">
        {{ player.name }}
      </li>
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

<style>
input {
  width:60%;
}



div .searchResults{
  position: absolute;
  justify-content:end;
  text-align: center;
  right:40%;
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

</style>