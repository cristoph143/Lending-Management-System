import penalty_calculator from './penalty_calculator.js';
import loanCalculator from './loanCalculator.js';
import formula from './formula.js';
const loanTypeStore = {
    modules: {
        penalty_calculator: penalty_calculator,
        loanCalculator: loanCalculator,
        formula: formula,
    },
};

export default loanTypeStore;