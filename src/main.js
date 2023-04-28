import {
    createApp
} from 'vue';
import App from './App.vue';
import store from './store';
import router from './router'
import '../src/assets/styles/css/main.css'
import Vueform from '@vueform/vueform/plugin'
import vueformConfig from '../vue-form.config'

const app = createApp(App);
app.use(Vueform, vueformConfig)
app.use(router);
app.use(store);
app.mount('#app');