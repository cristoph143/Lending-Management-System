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
        const { loanAmount, loanTerm, paymentFrequency, starting_date } = formData;
        const numberOfPayments = this.calculateNumberOfPayments(loanTerm, paymentFrequency);
        const monthly_Payment = this.monthlyPayment(formData, numberOfPayments);
        let fixed_interest = {
            loanAmount,
            monthly_Payment,
            numberOfPayments,
            loanTerm,
            starting_date,
        };
        const calculate_fixed_Monthly_Payment = this.fixed_calculate_Monthly_Payment(fixed_interest);
        // const diminishingInterest =this.diminishing_calculate_fixed_Monthly_Payment(formData, fixed_interest);
        console.log(calculate_fixed_Monthly_Payment);
        return { fixed_interest, calculate_fixed_Monthly_Payment };
        // return {fixed_interest, diminishingInterest};
    },
    calculateLumpSum(formData) {
        const { loanAmount, loanTerm, paymentFrequency, starting_date } = formData;
        console.log(loanAmount);
        console.log(loanTerm);
        console.log(paymentFrequency);
        const numberOfPayments = this.calculateNumberOfPayments(loanTerm, paymentFrequency);
        const monthly_Payment = this.monthlyPayment(formData, numberOfPayments);
        const lump_sum = {
            loanAmount,
            numberOfPayments,
            monthly_Payment,
            loanTerm,
            starting_date,
        };
        const lump_sum_Monthly_Payment = this.lump_sum_Monthly_Payment(lump_sum, monthly_Payment);
        return { lump_sum, lump_sum_Monthly_Payment };
    },
    calculateDiminishingInterest(formData) {
        const { loanAmount, loanTerm, paymentFrequency, starting_date } = formData;
        const numberOfPayments = this.calculateNumberOfPayments(loanTerm, paymentFrequency);
        const monthly_Payment = this.monthlyPayment(formData, numberOfPayments);
        const diminishing_interest = {
            loanAmount,
            numberOfPayments,
            monthly_Payment,
            loanTerm,
            starting_date,
        };
        const payment_table = this.diminishing_calculate_Monthly_Payment(diminishing_interest, paymentFrequency)
        return { diminishing_interest, payment_table };
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
        const interest = this.total_Interest_Rate(paymentFrequency)
        let totalInterestRate = 0;
        if (loan_type == 'diminishing-interest') {
            if (paymentFrequency === 1) {
                totalInterestRate = interestRate;
            } else {
                totalInterestRate = interestRate / interest;
            }
        } else {
            totalInterestRate = loanAmount * interestRate * loanTerm;
        }
        console.log(totalInterestRate)
        switch (loan_type) {
            case "fixed-interest":
                monthlyPayment = ((loanAmount + totalInterestRate) / numberOfPayments);
                break;
            case "lump-sum":
                monthlyPayment = (totalInterestRate / numberOfPayments);
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
    total_Interest_Rate(paymentFrequency) {
        let totalInterestRate = 0;
        switch (paymentFrequency) {
            case 365:
                totalInterestRate = (365 / 12);
                break;
            case 52:
                totalInterestRate = (52 / 12);
                break;
            case 2:
                totalInterestRate = 2;
                break;
            default:
                totalInterestRate = 1;
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

        return payment;
    },
    diminishing_calculate_Monthly_Payment(data, paymentFrequency) {
        let { loanAmount, numberOfPayments, monthly_Payment, starting_date } = data;
        let { monthlyPayment, interestRate, totalInterestRate } = monthly_Payment;

        let payments = [];
        let payment = {};
        let beginning_balance = loanAmount;
        console.log(beginning_balance);
        let ending_balance = beginning_balance;
        let extra_payment = 0;
        let paymentNumber = 1;
        let interest = 0;
        let principal = 0;
        let totalAmount = 0;
        let amount = 0;
        let paymentDate = new Date(starting_date);
        payment = {
            paymentNumber: 0,
            paymentDate: paymentDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
            beginning_balance: beginning_balance,
            totalAmount: totalAmount,
            interest: interest,
            principal: principal,
            extra_payment: extra_payment,
            ending_balance: ending_balance,
        };
        // push payment object to payments array
        payments.push(payment);
        // loop through the number of payments
        for (let i = 0; i < numberOfPayments; i++) {
            beginning_balance = ending_balance;
            interest = beginning_balance * interestRate / this.total_Interest_Rate(paymentFrequency);
            amount = beginning_balance + interest;
            totalAmount = Math.min(monthlyPayment, amount);
            principal = totalAmount - interest;
            console.log(principal + '')
            extra_payment = 0;
            ending_balance = beginning_balance - principal - extra_payment;
            totalInterestRate = totalInterestRate + interest;
            paymentDate.setMonth(paymentDate.getMonth() + 1);
            payment = {
                paymentNumber: paymentNumber,
                paymentDate: paymentDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
                beginning_balance: beginning_balance,
                totalAmount: totalAmount,
                interest: interest,
                principal: principal,
                extra_payment: extra_payment,
                ending_balance: ending_balance,
            };
            // round the values before pushing to the payments array
            payment.beginning_balance = this.roundToTwoDecimalPlaces(payment.beginning_balance);
            payment.totalAmount = this.roundToTwoDecimalPlaces(payment.totalAmount);
            payment.interest = this.roundToTwoDecimalPlaces(payment.interest);
            payment.principal = this.roundToTwoDecimalPlaces(payment.principal);
            payment.extra_payment = this.roundToTwoDecimalPlaces(payment.extra_payment);
            payment.ending_balance = this.roundToTwoDecimalPlaces(payment.ending_balance);
            payments.push(payment);
            paymentNumber++;
        }
        console.table(payments);
        return payments;
    },
    roundToTwoDecimalPlaces(num) {
        return Math.round(num * 100) / 100;
    },
    fixed_calculate_Monthly_Payment(data) {
        let { loanAmount, numberOfPayments, monthly_Payment, starting_date } = data;
        let { totalInterestRate } = monthly_Payment;

        let payments = [];
        let payment = {};
        let beginning_balance = loanAmount;
        console.log(beginning_balance);
        let extra_payment = 0;
        let paymentNumber = 1;
        let interest = 0;
        let principal = 0;
        let totalAmount = 0;
        let paymentDate = new Date(starting_date);
        let ending_balance = beginning_balance - principal - extra_payment;

        payment = {
            paymentNumber: 1,
            paymentDate: paymentDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
            beginning_balance: beginning_balance,
            totalAmount: totalAmount,
            interest: interest,
            principal: principal,
            extra_payment: extra_payment,
            ending_balance: ending_balance,
        };
        payments.push(payment);

        for (let i = 0; i < numberOfPayments; i++) {
            beginning_balance = paymentNumber > numberOfPayments ? 0 : ending_balance;
            interest = beginning_balance <= 0.001 ? 0 : totalInterestRate / numberOfPayments;
            principal = beginning_balance <= 0.001 ? 0 : Math.min(loanAmount / numberOfPayments, beginning_balance);
            totalAmount = principal + interest;
            ending_balance = beginning_balance - principal - extra_payment;
            paymentDate = new Date(paymentDate.setMonth(paymentDate.getMonth() + 1));
            payment = {
                paymentNumber: paymentNumber,
                paymentDate: paymentDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
                beginning_balance: beginning_balance,
                totalAmount: totalAmount,
                interest: interest,
                principal: principal,
                extra_payment: extra_payment,
                ending_balance: ending_balance,
            };
            // round the values before pushing to the payments array
            payment.beginning_balance = this.roundToTwoDecimalPlaces(payment.beginning_balance);
            payment.totalAmount = this.roundToTwoDecimalPlaces(payment.totalAmount);
            payment.interest = this.roundToTwoDecimalPlaces(payment.interest);
            payment.principal = this.roundToTwoDecimalPlaces(payment.principal);
            payment.ending_balance = this.roundToTwoDecimalPlaces(payment.ending_balance);
            payments.push(payment);
            paymentNumber++;
        }
        console.table(payments);
        return payments;
    },
    lump_sum_Monthly_Payment(data, paymentFrequency) {
        let { loanAmount, numberOfPayments, monthly_Payment, starting_date } = data;
        let { interestRate } = monthly_Payment;

        let payments = [];
        let paymentNumber = 1;
        let principal = 0;
        let interest = 0;
        let payment = {};
        let beginning_balance = loanAmount;
        let paymentDate = new Date(starting_date);
        let extra_payment = 0;
        let ending_balance = beginning_balance - principal - extra_payment;
        payment = {
            paymentNumber: 0,
            paymentDate: paymentDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
            beginning_balance: beginning_balance,
            interest: interest,
            principal: principal,
            extra_payment: extra_payment,
            ending_balance: ending_balance,
        };
        // push payment object to payments array
        payments.push(payment);

        // loop through the number of payments
        for (let i = 0; i < numberOfPayments; i++) {
            beginning_balance = paymentNumber > numberOfPayments ? 0 : ending_balance;
            interest = beginning_balance * interestRate / this.total_Interest_Rate(paymentFrequency);
            principal = paymentNumber == numberOfPayments ? beginning_balance : 0;
            ending_balance = beginning_balance - principal;
            // calculate payment date
            paymentDate = new Date(
                paymentDate.setMonth(paymentDate.getMonth() + 1)
            );
            payment = {
                paymentNumber: paymentNumber,
                paymentDate: paymentDate.toLocaleDateString(),
                beginning_balance: beginning_balance,
                interest: interest,
                principal: principal,
                extra_payment: extra_payment,
                ending_balance: ending_balance,
            };
            // round the values before pushing to the payments array
            payment.beginning_balance = this.roundToTwoDecimalPlaces(payment.beginning_balance);
            payment.interest = this.roundToTwoDecimalPlaces(payment.interest);
            payment.principal = this.roundToTwoDecimalPlaces(payment.principal);
            payment.ending_balance = this.roundToTwoDecimalPlaces(payment.ending_balance);
            payments.push(payment);
            paymentNumber++;
        }
        console.table(payments);
        return payments;
    }
};