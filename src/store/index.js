import {
    createStore
} from 'vuex';
import loan_type from "./modules/loan_type";

export default createStore({
    modules: {
        loan_type,
    },
});