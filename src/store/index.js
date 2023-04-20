import {
    createStore
} from 'vuex';
import destination from "./modules/destinations";

export default createStore({
    modules: {
        destination,
    },
});