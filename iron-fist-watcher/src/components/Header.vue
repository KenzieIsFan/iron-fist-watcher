<template> 
    <select v-model="observed_tour"  @change="set_select()">
            
            <option value="European TEKKEN Cup 3">European TEKKEN Cup 3</option>
        
            <option value="TEKKEN World Tour 2024" >TEKKEN World Tour 2024</option>
        
    </select>
    

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

