import loanTypeModule from './loanTypeModule';
import penaltyCalculatorModule from './PenaltyCalculator/penaltyCalculatorModule';
const loanTypeStore = {
    modules: {
        loan_type: loanTypeModule,
        penalty_Calculator: penaltyCalculatorModule
    },
};

export default loanTypeStore;