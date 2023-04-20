<template>
  <div class="container">
    <div class="row">
      <!-- input for loan desired amount -->
      <div class="form-group">
        <form class="form">
          <label for="loanAmount">Loan Amount</label>
          <input
            type="number"
            class="form-control"
            id="loanAmount"
            placeholder="Enter Loan Amount"
            v-model="loanAmount"
          />
          <!-- terms in months -->
          <label for="loanTerm">Loan Term</label>
          <input
            type="number"
            class="form-control"
            id="loanTerm"
            placeholder="Enter Loan Term(Months)"
            v-model="loanTerm"
          />
          <!-- payment frequency -->
          <label for="paymentFrequency">Payment Frequency</label>
          <select
            class="form-control"
            id="paymentFrequency"
            v-model="paymentFrequency"
            aria-placeholder="Select Payment Frequency"
          >
            <option value="365">Daily</option>
            <option value="52">Weekly</option>
            <option value="2">Twice a Month</option>
            <option value="1">Monthly</option>
          </select>
          <!-- readOnly number of payments from calculated loan -->
          <label for="numberOfPayments">Number of Payments</label>
          <input
            type="number"
            class="form-control"
            id="numberOfPayments"
            placeholder="Number of Payments"
            v-model="numberOfPayments"
            readonly
          />
          <!-- readOnly monthly payment from calculated loan -->
          <label for="monthlyPayment">Monthly Payment</label>
          <input
            type="number"
            class="form-control"
            id="monthlyPayment"
            placeholder="Monthly Payment"
            v-model="monthlyPayment"
            readonly
          />
          <!-- submit button to calculate payment period -->
          <button
            type="button"
            class="btn btn-primary"
            @click="
              calculatePaymentPeriod();
              calculateMonthlyPayment();
            "
          >
            Calculate Payment Period
          </button>
          <!-- clear button -->
          <button type="button" class="btn btn-primary" @click="clearForm()">
            Clear
          </button>
        </form>
      </div>
    </div>
    <div class="row show flezxi" v-if="!show">
      <h1>Lump Sum</h1>
      <!-- description of diminishing interest -->
      <p>
        a single payment made at a particular time, as opposed to a number of
        smaller payments or installments.
      </p>
    </div>
    <div class="row scroll" v-if="show">
      <!-- display the table form of calculated loan which number of rows depends to the number of payments -->
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">Payment Number</th>
            <th scope="col">Payment Date</th>
            <th scope="col">Beginning Balance</th>
            <th scope="col">Interest</th>
            <th scope="col">Principal</th>
            <th scope="col">Ending Balance</th>
          </tr>
        </thead>
        <!-- table for  -->
        <tbody>
          <tr v-for="payment in payments" :key="payment.paymentNumber">
            <td>{{ payment.paymentNumber }}</td>
            <td>{{ payment.paymentDate }}</td>
            <td>{{ payment.beginning_balance }}</td>
            <td>{{ payment.interest }}</td>
            <td>{{ payment.principal }}</td>
            <td>{{ payment.ending_balance }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "LumpSum",
  data() {
    return {
      loanAmount: 0,
      loanTerm: 0,
      interestRate: 0.05,
      monthlyPayment: 0,
      totalInterest: 0,
      processingFee: 0,
      paymentFrequency: 1,
      numberOfPayments: 0,
      show: false,
      extra_payments: 0,
    };
  },
  methods: {
    enterAmount() {
      console.log(this.loanAmount);
    },
    calculatePaymentPeriod() {
      // if inout is empty, alert and show is false
      if (this.loanAmount == 0 || this.loanTerm == 0) {
        alert("Please enter loan amount and loan term");
        this.show = false;
      }
      this.show = true;
      let numberOfPayments = this.number_of_payments();
      // alert(numberOfPayments)
      this.numberOfPayments = numberOfPayments;
      // call monthly_payment function
      let monthlyPayment = this.monthly_payment(numberOfPayments);
      // alert(monthlyPayment)
      this.monthlyPayment = monthlyPayment;
    },
    number_of_payments() {
      let loanTerm = this.loanTerm;
      let paymentFrequency = this.paymentFrequency;
      let numberOfPayments = 0;

      // if payment frequency is 365
      if (paymentFrequency == 365) {
        numberOfPayments = (paymentFrequency / 12) * loanTerm;
        // roundup
        numberOfPayments = Math.ceil(numberOfPayments);
      }
      // if payment frequency is 52
      else if (paymentFrequency == 52) {
        numberOfPayments = (paymentFrequency / 12) * loanTerm;
        // roundup
        numberOfPayments = Math.ceil(numberOfPayments);
      }
      // if payment frequency is 2
      else if (paymentFrequency == 2 || paymentFrequency == 1) {
        numberOfPayments = paymentFrequency * loanTerm;
      }
      return numberOfPayments;
    },
    monthly_payment(numberOfPayments) {
      let monthlyPayment = 0;
      let total_interest_rate = this.interest_rate();
      monthlyPayment = (total_interest_rate / numberOfPayments).toFixed(2);

      return monthlyPayment;
    },
    interest_rate() {
      let loanAmount = this.loanAmount;
      let interestRate = this.interestRate;
      let loanTerm = this.loanTerm;
      let totalInterestRate = 0;
      totalInterestRate = loanAmount * interestRate * loanTerm;
      return totalInterestRate;
    },
    calculateMonthlyPayment() {
      let numberOfPayments = this.numberOfPayments;
      let payments = [];
      let paymentNumber = 1;
      let paymentDate = new Date();
      let principal = 0;
      let interest = 0;
      let payment = {};
      let beginning_balance = this.loanAmount;
      let ending_balance = beginning_balance;
      let number_of_payments = this.number_of_payments();
      let loanTerm = this.loanTerm;
      payment = {
        paymentNumber: 0,
        paymentDate: paymentDate.toLocaleDateString(),
        beginning_balance: beginning_balance.toFixed(2),
        principal: principal.toFixed(2),
        interest: interest.toFixed(2),
        ending_balance: ending_balance.toFixed(2),
      };
      // push payment object to payments array
      payments.push(payment);

      // loop through the number of payments
      for (let i = 0; i < numberOfPayments; i++) {
        // calculate beginning balance
        beginning_balance = ending_balance;
        // calculate interest
        interest = this.interest_rate() / number_of_payments;
        // calculate principal
        if (paymentNumber == loanTerm) {
          principal = beginning_balance;
        } else {
          principal = 0;
        }
        // calculate balance
        ending_balance = beginning_balance - principal;
        // calculate payment date
        paymentDate = new Date(
          paymentDate.setMonth(paymentDate.getMonth() + 1)
        );
        // create payment object
        payment = {
          paymentNumber: paymentNumber,
          paymentDate: paymentDate.toLocaleDateString(),
          beginning_balance: beginning_balance.toFixed(2),
          principal: principal.toFixed(2),
          interest: interest.toFixed(2),
          ending_balance: ending_balance.toFixed(2),
        };
        // push payment object to payments array
        payments.push(payment);
        // increment payment number
        paymentNumber++;
      }
      // set payments
      this.payments = payments;
      console.table(this.payments);
    },
    clearForm() {
      // clear the form
      this.loanAmount = 0;
      this.loanTerm = 0;
      this.interestRate = 0;
      this.paymentFrequency = 0;
      this.show = false;
    },
  },
  // watch values in form
  watch: {
    loanAmount: function () {
      this.enterAmount();
    },
    loanTerm: function () {
      this.enterAmount();
    },
    paymentFrequency: function () {
      this.enterAmount();
    },
    numberOfPayments: function () {
      this.calculatePaymentPeriod();
    },
  },
};
</script>

// import style.css
<style src="C:\Repositories\Banking System\src\styles.css"></style>
