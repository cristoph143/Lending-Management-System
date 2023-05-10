import { functions } from "./functions";
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

const baseResult = {
    loanAmount: 0,
    numberOfPayments: 0,
    monthlyPayment: 0,
}

const state = {
    fixed_interest: {
        ...baseState,
        fixed_interestResult: {
            ...baseResult,
        },
    },
    lump_sum: {...baseState,
        lump_SumResult: {
            ...baseResult,
        },
    },
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
    diminishing_interest: {
        ...baseState,
        interestRate: 0.01,
        diminishing_interestResult: {
            ...baseResult,
        }
    },
};

const actions = {
    calculatePenalty({ commit }, formData) {
        const { dueDate, actualDate, amountDue } = formData;
        const penaltyRate = state.penalty_calculator.penaltyRate;
        const penaltyRatePerDay = penaltyRate / 30;
        console.log(formData)
        console.log("Penalty rate:", penaltyRate)
        console.log("Penalty rate per day:", penaltyRatePerDay)
        console.log("Amount due:", amountDue)
        console.log("Due date:", dueDate)
        console.log("Actual payment date:", actualDate)

        const numberOfDaysLate = functions.calculateDaysLate(dueDate, actualDate);
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
    calculateLoan({ commit }, formData) {
        const { loanAmount, loanTerm, paymentFrequency, loan_type } = formData;
        console.log(loanAmount);
        console.log(loanTerm);
        console.log(paymentFrequency);
        console.log(loan_type);
        switch (loan_type) {
            case "fixed-interest":
                {
                    const fixed_interestResult = calculateFixedInterest(formData);
                    console.log(fixed_interestResult);
                    commit("SET_FIXED_INTEREST", fixed_interestResult);
                    return fixed_interestResult;
                }
            case "lump-sum":
                {
                    const lump_sum = calculateLumpSum(formData);
                    commit("SET_LUMP_SUM", lump_sum);
                    return lump_sum;
                }
            case "diminishing-interest":
                {
                    const diminishing_interest = calculateDiminishingInterest(formData);
                    commit("SET_DIMINISHING_INTEREST", diminishing_interest);
                    return diminishing_interest;
                }
            default:
                return;
        }
    },

}

function calculateFixedInterest(formData) {
    const { loanAmount, loanTerm, paymentFrequency } = formData;
    console.log(loanAmount);
    console.log(loanTerm);
    console.log(paymentFrequency);
    const numberOfPayments = functions.calculateNumberOfPayments(loanTerm, paymentFrequency);
    const monthlyPayment = functions.monthlyPayment(formData, numberOfPayments);
    // const totalInterest = calculateTotalInterest(monthlyPayment, numberOfPayments, loanAmount);
    // const processingFee = calculateProcessingFee(loanAmount);
    // const extra_payments = calculateExtraPayments(loanAmount, processingFee, totalInterest);
    const fixed_interest = {
        loanAmount,
        numberOfPayments,
        monthlyPayment,
        //     loanTerm,
        //     interestRate,
        //     totalInterest,
        //     processingFee,
        //     paymentFrequency,
        //     extra_payments
    };
    console.log(fixed_interest);
    return fixed_interest;
}

function calculateLumpSum(formData) {
    const { loanAmount, loanTerm, paymentFrequency } = formData;
    console.log(loanAmount);
    console.log(loanTerm);
    console.log(paymentFrequency);
    const numberOfPayments = functions.calculateNumberOfPayments(loanTerm, paymentFrequency);
    const monthlyPayment = functions.monthlyPayment(formData, numberOfPayments);
    //     const processingFee = calculateProcessingFee(loanAmount);
    //     const extra_payments = calculateExtraPayments(loanAmount, processingFee, totalInterest);
    const lump_sum = {
        loanAmount,
        numberOfPayments,
        monthlyPayment,
        //         loanTerm,
        //         interestRate,
        //         totalInterest,
        //         processingFee,
        //         paymentFrequency,
        //         extra_payments
    };
    return lump_sum;
}

function calculateDiminishingInterest(formData) {
    const { loanAmount, loanTerm, paymentFrequency } = formData;
    console.log(loanAmount);
    console.log(loanTerm);
    console.log(paymentFrequency);
    const numberOfPayments = functions.calculateNumberOfPayments(loanTerm, paymentFrequency);
    const monthlyPayment = functions.monthlyPayment(formData, numberOfPayments);
    //     const totalInterest = calculateTotalInterest(monthlyPayment, numberOfPayments, loanAmount);
    //     const processingFee = calculateProcessingFee(loanAmount);
    //     const extra_payments = calculateExtraPayments(loanAmount, processingFee, totalInterest);
    const diminishing_interest = {
        loanAmount,
        numberOfPayments,
        monthlyPayment,
        //         loanTerm,
        //         interestRate,
        //         totalInterest,
        //         processingFee,
        //         paymentFrequency,
        //         extra_payments
    };
    return diminishing_interest;
}



const mutations = {
    SET_PENALTY_RESULT(state, penaltyResult) {
        state.penaltyResult = penaltyResult;
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