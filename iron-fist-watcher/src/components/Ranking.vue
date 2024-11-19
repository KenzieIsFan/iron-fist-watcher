<template>
    <vue-good-table
      :columns="columns"
      :rows="tourData.data"
      styleClass="vgt-table striped bordered"
      ></vue-good-table>
</template>

<script setup>
import {defineProps, ref} from 'vue';
const tourData = defineProps([ 'data'] )
const columns = ref([
  {
    label:'Name',
    field:'title'
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
  dateOutputFormat: 'MMM dd yyyy',
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
</script>