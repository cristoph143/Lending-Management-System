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
    tableHeaders: [
        { name: 'Payment #', field: 'paymentNumber' },
        { name: 'Month', field: 'paymentDate' },
        { name: 'Starting Balance', field: 'beginning_balance' },
        { name: 'Total', field: 'totalAmount' },
        { name: 'Interest', field: 'interest' },
        { name: 'Principal', field: 'principal' },
        { name: 'Extra Payment', field: 'extraPayment', editable: true },
        { name: 'Ending Balance', field: 'ending_balance' }
    ]
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
                    commit("SET_FIXED_INTEREST", fixed_interestResult.fixed_interest);
                    commit("SET_PAYMENT_TABLE", fixed_interestResult.payment_table)
                    return fixed_interestResult;
                }
            case "lump-sum":
                {
                    const lump_sum = functions.calculateLumpSum(formData);
                    commit("SET_LUMP_SUM", lump_sum.lump_sum);
                    commit("SET_PAYMENT_TABLE", lump_sum.payment_table)
                    return lump_sum;
                }
            case "diminishing-interest":
                {
                    const diminishing_interest = functions.calculateDiminishingInterest(formData);
                    commit("SET_DIMINISHING_INTEREST", diminishing_interest.diminishing_interest);
                    commit("SET_PAYMENT_TABLE", diminishing_interest.payment_table)
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
    SET_PAYMENT_TABLE(state, payment_table) {
        console.log(payment_table)
        state.payment_table = payment_table;
    },
    UPDATE_EXTRA_PAYMENT(state, { rowIndex, extraPayment }) {
        const row = state.tableData[rowIndex]
        row[6] = extraPayment
        const startingBalance = rowIndex === 0 ? this.state.initialBalance : state.tableData[rowIndex - 1][7]
        const totalPayment = row[3] + extraPayment
        const interestPayment = startingBalance * state.interestRate / 12
        const principalPayment = totalPayment - interestPayment
        const endingBalance = startingBalance - principalPayment
        row[4] = interestPayment
        row[5] = principalPayment
        row[7] = endingBalance
        for (let i = rowIndex + 1; i < state.tableData.length; i++) {
            const prevRow = state.tableData[i - 1]
            const currentRow = state.tableData[i]
            const startingBalance = prevRow[7]
            const totalPayment = currentRow[3] + currentRow[6]
            const interestPayment = startingBalance * state.interestRate / 12
            const principalPayment = totalPayment - interestPayment
            const endingBalance = startingBalance - principalPayment
            currentRow[2] = startingBalance
            currentRow[4] = interestPayment
            currentRow[5] = principalPayment
            currentRow[7] = endingBalance
        }
    }
};

const getters = {
    paymentTableData: (state) => state.penalty_calculator,
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}