import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import CanvasJSChart from '@canvasjs/vue-charts';

import VueGoodTablePlugin from 'vue-good-table-next';

// import the styles 
import 'vue-good-table-next/dist/vue-good-table-next.css'


const app = createApp(App);


app.use(VueGoodTablePlugin);
app.use(CanvasJSChart); // install the CanvasJS Vuejs Chart Plugin
app.mount('#app');
