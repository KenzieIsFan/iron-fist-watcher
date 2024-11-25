<template> 
<div class="user_input">
   
    <SearchBar @change-player="(name) => $emit('change-player', name)"></SearchBar>
</div>
</template>

<script setup>
    import { useTemplateRef, ref,reactive, onMounted } from 'vue'
    import SearchBar from './SearchBar.vue';
    defineEmits(['change-player']) 

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
.user_input {
    text-align:center;
}
</style>


