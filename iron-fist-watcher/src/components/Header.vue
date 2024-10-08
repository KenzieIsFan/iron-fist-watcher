<template> 
    <h3>Iron Fist Watcher - {{ observed_tour }}</h3>
    <ul id="list" class="list">
        <li
        v-for="player in observed_players"
        :key="player.id"  
        >
        {{ player.name }} <span>{{ player.points }}</span>
        </li>
    </ul>
   
</template>

<script setup>
const props = defineProps( {
    observed_players: {
        type: Array,
        required: true
    },
    observed_tour: {
        type: String,
        required: true
    }

})
</script>

<style>
.titlebox{
    
    position:absolute;
}
.rankbox{
    position:relative;
}
</style>

