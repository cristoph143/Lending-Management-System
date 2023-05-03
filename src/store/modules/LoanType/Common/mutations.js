const mutations = {
    setLoanAmount: (state, amount) => (state.loanAmount = amount),
    setLoanTerm: (state, term) => (state.loanTerm = term),
    setInterestRate: (state, rate) => (state.interestRate = rate),
    setMonthlyPayment: (state, payment) => (state.monthlyPayment = payment),
    setTotalInterest: (state, interest) => (state.totalInterest = interest),
    setProcessingFee: (state, fee) => (state.processingFee = fee),
    setPaymentFrequency: (state, frequency) =>
        (state.paymentFrequency = frequency),
    setNumberOfPayments: (state, numberOfPayments) =>
        (state.numberOfPayments = numberOfPayments),
    setShow: (state, show) => (state.show = show),
    setExtraPayments: (state, extraPayments) =>
        (state.extraPayments = extraPayments),
    setPenaltyRate: (state, penaltyRate) => (state.penaltyRate = penaltyRate),
    setPenaltyRatePerDay: (state, penaltyRatePerDay) =>
        (state.penaltyRatePerDay = penaltyRatePerDay),
    setAmountDue: (state, amountDue) => (state.amountDue = amountDue),
    setDueDate: (state, dueDate) => (state.dueDate = dueDate),
    setActualPaymentDate: (state, actualPaymentDate) =>
        (state.actualPaymentDate = actualPaymentDate),
    setNumberOfDaysLate: (state, numberOfDaysLate) =>
        (state.numberOfDaysLate = numberOfDaysLate),
    setPenaltyDuePercent: (state, penaltyDuePercent) =>
        (state.penaltyDuePercent = penaltyDuePercent),
    setTotalPenaltyDue: (state, totalPenaltyDue) =>
        (state.totalPenaltyDue = totalPenaltyDue),
    resetState: (state) => {
        state.loanAmount = 0;
        state.loanTerm = 0;
        state.interestRate = 0;
        state.monthlyPayment = 0;
        state.totalInterest = 0;
        state.processingFee = 0;
        state.paymentFrequency = 1;
        state.numberOfPayments = 0;
        state.extra_payments = 0;
        state.penaltyRate = 0;
        state.penaltyRatePerDay = 0;
        state.amountDue = 0;
        state.dueDate = "";
        state.actualPaymentDate = "";
        state.numberOfDaysLate = 0;
        state.penaltyDuePercent = 0;
        state.totalPenaltyDue = 0;
    }
};

export default mutations;