import store from "@/store";
const baseState = {
    loanAmount: 0,
    loanTerm: 0,
    interestRate: 0.05,
    monthlyPayment: 0,
    totalInterest: 0,
    processingFee: 0,
    paymentFrequency: 1,
    numberOfPayments: 0,
    extra_payments: 0,
};

const states = {
    fixed_interest: {...baseState },
    lump_sum: {...baseState },
    penalty_calculator: {
        penaltyRate: 3,
        penaltyRatePerDay: 0,
        amountDue: 0,
        dueDate: "",
        actualPaymentDate: "",
        numberOfDaysLate: 0,
        penaltyDuePercent: 0,
        totalPenaltyDue: 0,
        penaltyResult: {
            penaltyRatePerDay: 0,
            numberOfDaysLate: 0,
            penaltyDuePercent: 0,
            totalPenaltyDue: 0,
        }
    },
    diminishing_interest: {...baseState, interestRate: 0.01 },
};

const actions = {
    calculatePenalty({ commit }, formData) {
        const { dueDate, actualDate, amountDue } = formData;
        const penaltyRate = states.penalty_calculator.penaltyRate;
        const penaltyRatePerDay = penaltyRate / 30;
        console.log(formData)
        console.log("Penalty rate:", penaltyRate)
        console.log("Penalty rate per day:", penaltyRatePerDay)
        console.log("Amount due:", amountDue)
        console.log("Due date:", dueDate)
        console.log("Actual payment date:", actualDate)

        const numberOfDaysLate = calculateDaysLate(dueDate, actualDate);
        if (!numberOfDaysLate) return;
        const penaltyDuePercent = (penaltyRatePerDay * numberOfDaysLate).toFixed(2);
        const totalPenaltyDue = (amountDue * (penaltyDuePercent / 100)).toFixed(2);

        console.log("Penalty due:", numberOfDaysLate)
        console.log("Penalty due:", penaltyDuePercent)
        console.log("Penalty due:", totalPenaltyDue)

        const penaltyResult = {
            penaltyRatePerDay,
            numberOfDaysLate,
            penaltyDuePercent,
            totalPenaltyDue
        }

        commit("SET_PENALTY_RESULT", penaltyResult);
        return penaltyResult;
    },
}

// Define the calculateDaysLate function inside the calculatePenalty action
function calculateDaysLate(dueDate, actualPaymentDate) {
    const dueDateObj = new Date(dueDate);
    const actualPaymentDateObj = new Date(actualPaymentDate);
    console.log(dueDateObj)
    console.log(actualPaymentDateObj)
    if (actualPaymentDateObj < dueDateObj) {
        store.dispatch('toast/toast', {
            messages: ["Actual payment date is earlier than due date."],
            type: 'info',
        });
        return;
    }
    const timeDiff = Math.abs(actualPaymentDateObj.getTime() - dueDateObj.getTime());
    console.log(timeDiff)
    const numberOfDaysLate = Math.ceil(timeDiff / (1000 * 3600 * 24));
    console.log("Number of days late:", numberOfDaysLate)
    return numberOfDaysLate;
}


const mutations = {
    SET_PENALTY_RESULT(state, penaltyResult) {
        state.penaltyResult = penaltyResult;
    },
};

const getters = {
    penaltyResult: (state) => state.penalty_calculator,
};

export default {
    namespaced: true,
    states,
    getters,
    mutations,
    actions
}