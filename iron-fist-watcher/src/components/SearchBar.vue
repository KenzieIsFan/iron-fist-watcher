<template>
<input v-model="player_search" placeholder="Search for players here"/>
</template>

<script>
import {ref} from 'vue';
const player_search = ref('');

</script>