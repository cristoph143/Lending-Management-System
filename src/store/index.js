import loanTypeStore from './modules/LoanType/index.js';
import { createStore } from 'vuex';
import penalty_calculator from './modules/LoanType/penalty_calculator.js';

export default createStore({
    modules: {
        loan_type: loanTypeStore,
        penalty_calculator: penalty_calculator,
    },
});