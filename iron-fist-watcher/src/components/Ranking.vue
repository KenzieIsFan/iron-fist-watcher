<template>
    <vue-good-table
      :columns="columns"
      :rows="tourData.data"
      :theme = "theme"
      ></vue-good-table>
</template>

<script setup>
  import {defineProps, ref} from 'vue';
  const theme = ref('polar-bear')
  const tourData = defineProps(['data'] )
  const columns = ref([
    {
      label:'Name',
      field:'title',
    },

  {
    label: 'Type',
    field: 'class',
  },
  {
    label: 'Date',
    field: 'date',
    type: 'date',
    dateInputFormat: 'MM/dd/yyyy',
    dateOutputFormat: 'MM/dd/yy',
  },
  {
      label:"Rank",
      field:"rank",
      type:'number'
  },
  {
    label: 'Points Earned',
    field: 'points',
    type: 'number',
  }
  ])
  if (window?.matchMedia?.("(prefers-color-scheme:dark)")?.matches) {
    theme.value = 'nocturnal'
    
  } 


</script>

<style lang="css">
.vgt-responsive {
  overflow-x: hidden;
}

</style>