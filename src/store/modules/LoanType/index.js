import penalty_calculator from './penalty_calculator.js';
import loanCalculator from './loanCalculator.js';
const loanTypeStore = {
    modules: {
        penalty_calculator: penalty_calculator,
        loanCalculator: loanCalculator,
    },
};

export default loanTypeStore;