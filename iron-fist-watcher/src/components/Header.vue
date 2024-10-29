<template> 
    <select v-model="observed_tour"  @change="set_select()">
            
            <option value="European TEKKEN Cup 3">European TEKKEN Cup 3</option>
        
            <option value="TEKKEN World Tour 2024" >TEKKEN World Tour 2024</option>
        
            <option value="TEKKEN World Tour 2023">TEKKEN World Tour 2023</option>
        
            <option value="European TEKKEN Cup 2023">European TEKKEN Cup 2023</option>
        
            <option value="TEKKEN World Tour 2022">TEKKEN World Tour 2022</option>
        
            <option value="TEKKEN Online Challenge 2021">TEKKEN Online Challenge 2021</option>
        
            <option value="Online Dojo Open Beta Test">Online Dojo Open Beta Test</option>
        
    </select>
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
    import { useTemplateRef, ref,reactive, onMounted } from 'vue'
    const observed_tour = defineModel("observed_tour")
    const observed_players = defineModel("observed_players")
    const form = reactive({
    cat: ""
    })
    
    onMounted(() => {
        set_select()})
        const set_select = () => {
        form.cat = observed_tour.value
        }
</script>

<style>
.titlebox{
    
    position:absolute;
}
.rankbox{
    position:relative;
}
</style>

