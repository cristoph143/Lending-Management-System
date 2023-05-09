import destinationsStore from './modules/Destinations/index.js';
import loanTypeStore from './modules/LoanType/index.js';
import common from './modules/common/index.js';
import { createStore } from 'vuex';

export default createStore({
    modules: {
        destinationsStore: destinationsStore,
        loan_type: loanTypeStore,
        common: common,
    },
});