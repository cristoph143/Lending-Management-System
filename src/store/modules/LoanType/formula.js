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
        penaltyRate: 0.4,
        penaltyRatePerDay: 0,
        amountDue: 0,
        dueDate: "",
        actualPaymentDate: "",
        numberOfDaysLate: 0,
        penaltyDuePercent: 0,
        totalPenaltyDue: 0,
    },
    diminishing_interest: {...baseState, interestRate: 0.01 },
};

const actions = {
    calculatePenalty({ commit }, formData) {
        const { dueDate, actualPaymentDate, amountDue } = formData;
        const penaltyRate = states.penalty_calculator.penaltyRate;
        const penaltyRatePerDay = penaltyRate / 30;
        console.log(formData)
        console.log("Penalty rate:", penaltyRate)
        console.log("Penalty rate per day:", penaltyRatePerDay)
        console.log("Amount due:", amountDue)


        // Define the calculateDaysLate function inside the calculatePenalty action
        function calculateDaysLate(dueDate, actualPaymentDate) {
            const dueDateObj = new Date(dueDate);
            const actualPaymentDateObj = new Date(actualPaymentDate);
            const timeDiff = Math.abs(actualPaymentDateObj.getTime() - dueDateObj.getTime());
            console.log(timeDiff)
            const numberOfDaysLate = Math.ceil(timeDiff / (1000 * 3600 * 24));
            console.log("Number of days late:", numberOfDaysLate)
            return numberOfDaysLate;
        }

        const numberOfDaysLate = calculateDaysLate(dueDate, actualPaymentDate);
        const penaltyDuePercent = (penaltyRatePerDay * numberOfDaysLate).toFixed(2);
        const totalPenaltyDue = (amountDue * (penaltyDuePercent / 100)).toFixed(2);

        console.log("Penalty due:", numberOfDaysLate)
        console.log("Penalty due:", penaltyDuePercent)
        console.log("Penalty due:", totalPenaltyDue)

        commit("SET_PENALTY_DUE", totalPenaltyDue);
    },
}

const mutations = {
    SET_LOAN(state, { stateName, loanAmount }) {
        state[stateName].loanAmount = loanAmount;
    },
    SET_LOAN_TERM(state, { stateName, loanTerm }) {
        state[stateName].loanTerm = loanTerm;
    },
    SET_INTEREST_RATE(state, { stateName, interestRate }) {
        state[stateName].interestRate = interestRate;
    },
    SET_MONTHLY_PAYMENT(state, { stateName, monthlyPayment }) {
        state[stateName].monthlyPayment = monthlyPayment;
    },
    SET_TOTAL_INTEREST(state, { stateName, totalInterest }) {
        state[stateName].totalInterest = totalInterest;
    },
    SET_PROCESSING_FEE(state, { stateName, processingFee }) {
        state[stateName].processingFee = processingFee;
    },
    SET_PAYMENT_FREQUENCY(state, { stateName, paymentFrequency }) {
        state[stateName].paymentFrequency = paymentFrequency;
    },
    SET_NUMBER_OF_PAYMENTS(state, { stateName, numberOfPayments }) {
        state[stateName].numberOfPayments = numberOfPayments;
    },
    SET_EXTRA_PAYMENTS(state, { stateName, extra_payments }) {
        state[stateName].extra_payments = extra_payments;
    },
    SET_PENALTY_DUE(state, penaltyDue) {
        state.penaltyDue = penaltyDue;
    },
};

const getters = {
    loanAmount: (state) => (stateName) => state[stateName].loanAmount,
    loanTerm: (state) => (stateName) => state[stateName].loanTerm,
    interestRate: (state) => (stateName) => state[stateName].interestRate,
    monthlyPayment: (state) => (stateName) => state[stateName].monthlyPayment,
    totalInterest: (state) => (stateName) => state[stateName].totalInterest,
    processingFee: (state) => (stateName) => state[stateName].processingFee,
    paymentFrequency: (state) => (stateName) => state[stateName].paymentFrequency,
    numberOfPayments: (state) => (stateName) => state[stateName].numberOfPayments,
    extraPayments: (state) => (stateName) => state[stateName].extra_payments,
};

export default {
    namespaced: true,
    states,
    getters,
    mutations,
    actions
}