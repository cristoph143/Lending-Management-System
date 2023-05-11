import { functions } from "./functions";

const state = {
    fixed_interest: {
        interestRate: 0.05,
    },
    lump_sum: {
        interestRate: 0.05,
    },
    penalty_calculator: {
        penaltyRate: 0.03,
    },
    diminishing_interest: {
        interestRate: 0.01,
    },
};

const actions = {
    calculatePenalty({ commit }, formData) {
        const { dueDate, actualDate, amountDue } = formData;
        const penaltyRate = state.penalty_calculator.penaltyRate;
        const penaltyRatePerDay = penaltyRate / 30;

        const numberOfDaysLate = functions.calculateDaysLate(dueDate, actualDate);
        if (!numberOfDaysLate) return; // if calculateDaysLate return an alert
        const penaltyDuePercent = (penaltyRatePerDay * numberOfDaysLate).toFixed(2);
        const totalPenaltyDue = (amountDue * (penaltyDuePercent / 100)).toFixed(2);

        const penaltyResult = {
            penaltyRatePerDay,
            numberOfDaysLate,
            penaltyDuePercent,
            totalPenaltyDue
        }

        commit("SET_PENALTY_RESULT", penaltyResult);
        return penaltyResult;
    },
    calculateLoan({ commit }, formData) {
        const { loan_type } = formData;

        switch (loan_type) {
            case "fixed-interest":
                {
                    const fixed_interestResult = functions.calculateFixedInterest(formData);
                    console.log(fixed_interestResult);
                    commit("SET_FIXED_INTEREST", fixed_interestResult);
                    return fixed_interestResult;
                }
            case "lump-sum":
                {
                    const lump_sum = functions.calculateLumpSum(formData);
                    commit("SET_LUMP_SUM", lump_sum);
                    return lump_sum;
                }
            case "diminishing-interest":
                {
                    const diminishing_interest = functions.calculateDiminishingInterest(formData);
                    commit("SET_DIMINISHING_INTEREST", diminishing_interest);
                    return diminishing_interest;
                }
            default:
                return;
        }
    },
}



const mutations = {
    SET_PENALTY_RESULT(state, penaltyResult) {
        state.penalty_calculator.penaltyResult = penaltyResult;
    },
    SET_LOAN(state, loan_type) {
        state.loan_type = loan_type;
    },
    SET_FIXED_INTEREST(state, fixed_interestResult) {
        console.log(fixed_interestResult)
        state.fixed_interest.fixed_interestResult = fixed_interestResult;
    },
    SET_LUMP_SUM(state, lump_SumResult) {
        console.log(lump_SumResult)
        state.lump_sum.lump_SumResult = lump_SumResult;
    },
    SET_DIMINISHING_INTEREST(state, diminishing_interestResult) {
        console.log(diminishing_interestResult)
        state.diminishing_interest.diminishing_interestResult = diminishing_interestResult;
    },
};

const getters = {
    penaltyResult: (state) => state.penalty_calculator,
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}