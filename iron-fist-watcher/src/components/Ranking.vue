<template>
    <vue-good-table
      :columns="columns"
      :rows="tourData.data"/>
</template>

<script setup>
import {defineProps, ref} from 'vue';
const tourData = defineProps([ 'data'] )
const columns = ref([

{
  label: 'Tournament type',
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
    label:"Tournament placement",
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