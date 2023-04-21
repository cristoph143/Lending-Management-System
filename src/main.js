import Vue from 'vue';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';

Vue.use(VueMaterial);
import {
    createApp
} from 'vue';
import App from './App.vue';
import store from './store';
import router from './router'
import Vueform from '@vueform/vueform/plugin'
import vueformConfig from './../vueform.config'

import '../src/assets/css/main.css'

const app = createApp(App);
app.use(router);
app.use(store);
app.use(Vueform, vueformConfig)
app.mount('#app');