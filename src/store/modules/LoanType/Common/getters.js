const getters = {
    getLoanAmount: (state) => state.loanAmount,
    getLoanTerm: (state) => state.loanTerm,
    getInterestRate: (state) => state.interestRate,
    getMonthlyPayment: (state) => state.monthlyPayment,
    getTotalInterest: (state) => state.totalInterest,
    getProcessingFee: (state) => state.processingFee,
    getPaymentFrequency: (state) => state.paymentFrequency,
    getNumberOfPayments: (state) => state.numberOfPayments,
    getExtraPayments: (state) => state.extraPayments,
    getPenaltyRate: (state) => state.penaltyRate,
    getPenaltyRatePerDay: (state) => state.penaltyRatePerDay,
    getAmountDue: (state) => state.amountDue,
    getDueDate: (state) => state.dueDate,
    getActualPaymentDate: (state) => state.actualPaymentDate,
    getNumberOfDaysLate: (state) => state.numberOfDaysLate,
    getPenaltyDuePercent: (state) => state.penaltyDuePercent,
    getTotalPenaltyDue: (state) => state.totalPenaltyDue,
};

export default getters;