import loanTypeStore from './modules/LoanType/index.js';
import { createStore } from 'vuex';

export default createStore({
    modules: {
        loan_type: loanTypeStore,
    },
});