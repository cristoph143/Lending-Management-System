import {
    createApp,
} from 'vue';
import App from './App.vue';
import store from './store';
import router from './router'
import '../src/assets/styles/css/main.css'
import Vueform from '@vueform/vueform/plugin'
import vueformConfig from '../vue-form.config'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";


const app = createApp(App);
const options = {
    transition: "Vue-Toastification__fade",
    maxToasts: 30,
    newestOnTop: true,
    filterToasts: (toasts) => {
        // Keep track of existing types
        const types = {};
        return toasts.reduce((aggToasts, toast) => {
            // Check if type was not seen before
            if (!types[toast.type]) {
                aggToasts.push(toast);
                types[toast.type] = true;
            }
            return aggToasts;
        }, []);
    },
}
app.use(Toast, options);
app.use(Vueform, vueformConfig)
app.use(router);
app.use(store);
app.mount('#app');