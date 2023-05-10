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
        return monthlyPayment;
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