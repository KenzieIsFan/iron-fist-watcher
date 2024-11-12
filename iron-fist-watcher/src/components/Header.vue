<template> 
    <select v-model="observed_tour"  @change="set_select()">
                    
            <option value="TEKKEN World Tour 2024" >TEKKEN World Tour 2024</option>
        
    </select>
    
    <SearchBar></SearchBar>
</template>

<script setup>
    import { useTemplateRef, ref,reactive, onMounted } from 'vue'
import SearchBar from './SearchBar.vue';
    const observed_tour = defineModel("observed_tour")
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

