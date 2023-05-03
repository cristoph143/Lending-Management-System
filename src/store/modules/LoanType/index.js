import fixedInterestModule from './fixedInterestModule';
import lumpSumModule from './lumpSumModule';
import diminishingInterestModule from './diminishingInterestModule';
import penaltyCalculatorModule from '../LoanType/PenaltyCalculator/penaltyCalculatorModule';
import loanTypeModule from './loanTypeModule';
import state from './Common/store';

const loanTypeStore = {
    state,
    modules: {
        fixedInterest: fixedInterestModule,
        lumpSum: lumpSumModule,
        diminishingInterest: diminishingInterestModule,
        penaltyCalculator: penaltyCalculatorModule,
        loan_type: loanTypeModule,
    },
};

export default loanTypeStore;