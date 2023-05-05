import fixedInterestModule from './fixedInterestModule';
import lumpSumModule from './lumpSumModule';
import diminishingInterestModule from './diminishingInterestModule';
import penaltyCalculatorModule from './PenaltyCalculator/penaltyCalculatorModule';
import loanTypeModule from './loanTypeModule';
import penaltyCalculator from '../LoanType/penaltyCalculator'
const loanTypeStore = {
    modules: {
        fixedInterest: fixedInterestModule,
        lumpSum: lumpSumModule,
        diminishingInterest: diminishingInterestModule,
        penaltyCalculator: penaltyCalculatorModule,
        loan_type: loanTypeModule,
        penalty_Calculator: penaltyCalculator
    },
};

export default loanTypeStore;