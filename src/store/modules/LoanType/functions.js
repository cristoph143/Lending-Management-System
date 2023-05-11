import store from '@/store'

// Define the calculateDaysLate function inside the calculatePenalty action
export const functions = {
    calculateDaysLate(dueDate, actualPaymentDate) {
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
    },
    calculateFixedInterest(formData) {
        const { loanAmount, loanTerm, paymentFrequency } = formData;
        console.log(loanAmount);
        console.log(loanTerm);
        console.log(paymentFrequency);
        const numberOfPayments = this.calculateNumberOfPayments(loanTerm, paymentFrequency);
        const monthlyPayment = this.monthlyPayment(formData, numberOfPayments);
        // const totalInterest = calculateTotalInterest(monthlyPayment, numberOfPayments, loanAmount);
        // const processingFee = calculateProcessingFee(loanAmount);
        // const extra_payments = calculateExtraPayments(loanAmount, processingFee, totalInterest);
        const fixed_interest = {
            // borrower_name
            loanAmount,
            //     interestRate,
            //     processingFee,
            // start_date,
            //     loanTerm,
            //     paymentFrequency,
            numberOfPayments,
            monthlyPayment,
            //     totalInterest,
            //     extra_payments
            // total_cash_out
            // total_amount_collected
            // total_interest_earned
            // total_payments_collected
            // toatal_roi
        };
        console.log(fixed_interest);
        return fixed_interest;
    },
    calculateLumpSum(formData) {
        const { loanAmount, loanTerm, paymentFrequency } = formData;
        console.log(loanAmount);
        console.log(loanTerm);
        console.log(paymentFrequency);
        const numberOfPayments = this.calculateNumberOfPayments(loanTerm, paymentFrequency);
        const monthlyPayment = this.monthlyPayment(formData, numberOfPayments);
        const lump_sum = {
            loanAmount,
            numberOfPayments,
            monthlyPayment,
            loanTerm,
            //         interestRate,
            //         totalInterest,
            //         processingFee,
            //         paymentFrequency,
        };
        return lump_sum;
    },
    calculateDiminishingInterest(formData) {
        const { loanAmount, loanTerm, paymentFrequency } = formData;
        console.log(loanAmount);
        console.log(loanTerm);
        console.log(paymentFrequency);
        const numberOfPayments = this.calculateNumberOfPayments(loanTerm, paymentFrequency);
        const monthlyPayment = this.monthlyPayment(formData, numberOfPayments);

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
    },
    calculateNumberOfPayments(loanTerm, paymentFrequency) {
        let numberOfPayments = 0;
        if (paymentFrequency == 365 || paymentFrequency == 52) {
            numberOfPayments = (paymentFrequency / 12) * loanTerm;
        } else if (paymentFrequency == 2 || paymentFrequency == 1) {
            numberOfPayments = paymentFrequency * loanTerm;
        }
        numberOfPayments = Math.ceil(numberOfPayments);
        return numberOfPayments;
    },
    monthlyPayment(formData, numberOfPayments) {
        let { loanAmount, loanTerm, paymentFrequency, loan_type } = formData;
        let monthlyPayment = 0;
        const state = store.state.loan_type.formula;
        const interestRate = loan_type === "diminishing_interest" ?
            state.diminishing_interest.interestRate :
            state.fixed_interest.interestRate
        console.log(interestRate)

        let totalInterestRate =
            loan_type == 'diminishing-interest' ?
            this.total_Interest_Rate(paymentFrequency, interestRate) :
            loanAmount * interestRate * loanTerm;
        console.log(totalInterestRate)
        switch (loan_type) {
            case "fixed-interest":
                monthlyPayment = (
                    (loanAmount + totalInterestRate) /
                    numberOfPayments
                ).toFixed(2);
                break;
            case "lump-sum":
                monthlyPayment = (totalInterestRate / numberOfPayments).toFixed(2);
                break;
            case "diminishing-interest":
                monthlyPayment = this.calculatePayment(totalInterestRate, numberOfPayments, loanAmount, 0);
                break;
            default:
                // handle invalid paymentFrequency value
                break;
        }
        return { interestRate, monthlyPayment, totalInterestRate };
    },
    total_Interest_Rate(paymentFrequency, interestRate) {
        let totalInterestRate = 0;
        switch (paymentFrequency) {
            case "365":
                totalInterestRate = interestRate / (365 / 12);
                break;
            case "52":
                totalInterestRate = interestRate / (52 / 12);
                break;
            case "2":
                totalInterestRate = interestRate / 2;
                break;
            case "1":
                totalInterestRate = interestRate;
                break;
            default:
                // handle invalid paymentFrequency value
                break;
        }
        return totalInterestRate;
    },
    calculatePayment(interestRate, numberOfPayments, presentValue, futureValue, paymentType) {
        /*
          numberOfPayments = number of payments
          presentValue = initial loan amount
          futureValue = value of the loan at the end of the payment period
          paymentType = 0 for end of period, 1 for beginning of period
        */
        if (!futureValue) futureValue = 0;
        if (!paymentType) paymentType = 0;

        if (interestRate == 0) return -(presentValue + futureValue) / numberOfPayments;
        // present value interest factor
        var presentValueInterestFactor = Math.pow(1 + interestRate, numberOfPayments);
        var payment = (interestRate / (presentValueInterestFactor - 1)) * (presentValue * presentValueInterestFactor + futureValue);

        if (paymentType == 1) {
            payment /= 1 + interestRate;
        }

        return payment.toFixed(2);
    }

};