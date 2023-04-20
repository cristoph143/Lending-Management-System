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
          <!-- button for download pdf -->
          <button
            type="button"
            class="btn btn-primary"
            @click="downloadPDF()"
            v-if="show"
          >
            Download PDF
          </button>
        </form>
      </div>
    </div>
    <div class="row show flezxi" v-if="!show">
      <h1>Diminishing Interest</h1>
      <!-- description of diminishing interest -->
      <p>
        Diminishing Balance Interest Rate method, interest is calculated every
        month on the outstanding loan balance as reduced by the principal
        repayment every month.
        <br />EMI payment every month contains interest payable for the
        outstanding loan amount for the month plus principal repayment. <br />On
        every EMI payment, outstanding loan amount reduces by the amount of
        principal repayment. <br />Thus interest for next month is calculated
        only on the outstanding loan amount as reduced by the principal
        repayment this month.
      </p>
    </div>
    <div class="row scroll" v-if="show">
      <!-- display the table form of calculated loan which number of rows depends to the number of payments -->
      <table class="table table-striped">
        <thead class="thead">
          <tr>
            <th scope="col">Payment Number</th>
            <th scope="col">Payment Date</th>
            <th scope="col">Beginning Balance</th>
            <th scope="col">Payment Amount</th>
            <th scope="col">Interest</th>
            <th scope="col">Principal</th>
            <th scope="col">Ending Balance</th>
          </tr>
        </thead>
        <!-- table for  -->
        <tbody class="tbody">
          <tr v-for="payment in payments" :key="payment.paymentNumber">
            <td>{{ payment.paymentNumber }}</td>
            <td>{{ payment.paymentDate }}</td>
            <td>{{ payment.beginning_balance }}</td>
            <td>{{ payment.paymentAmount }}</td>
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
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
export default {
  name: "DiminishingInterest",
  data() {
    return {
      loanAmount: 0,
      loanTerm: 0,
      interestRate: 0.01,
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
      let monthlyPayment = this.monthly_payment();
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
    monthly_payment() {
      let loanAmount = this.loanAmount;
      let numberOfPayments = this.numberOfPayments;
      // let interestRate = this.interestRate;
      let monthlyPayment = 0;
      let paymentFrequency = this.paymentFrequency;
      let tot_interest = this.total_interest_rate(paymentFrequency);
      monthlyPayment = this.pmt(tot_interest, numberOfPayments, loanAmount, 0);
      return monthlyPayment;
    },
    pmt(rate, nper, pv, fv, type) {
      /*
        nper = number of payments
        pv = present value / loan amount
        fv = future value
        type = 0 for end of period, 1 for beginning of period
      */
      if (!fv) fv = 0;
      if (!type) type = 0;

      if (rate == 0) return -(pv + fv) / nper;
      // present value interest factor
      var pvif = Math.pow(1 + rate, nper);
      var pmt = (rate / (pvif - 1)) * (pv * pvif + fv);

      if (type == 1) {
        pmt /= 1 + rate;
      }

      return pmt.toFixed(2);
    },
    calculateMonthlyPayment() {
      let monthlyPayment = this.monthlyPayment;
      let numberOfPayments = this.numberOfPayments;
      let totalInterest = 0;
      // let balance = this.loanAmount;
      let payments = [];
      let paymentNumber = 1;
      let paymentDate = new Date();
      let paymentAmount = 0;
      let principal = 0;
      let interest = 0;
      let payment = {};
      let beginning_balance = this.loanAmount;
      let ending_balance = beginning_balance;
      let paymentFrequency = this.paymentFrequency;
      let interestRate = this.total_interest_rate(paymentFrequency);
      // this.show = true;
      payment = {
        paymentNumber: 0,
        paymentDate: paymentDate.toLocaleDateString(),
        beginning_balance: beginning_balance.toFixed(2),
        paymentAmount: paymentAmount.toFixed(2),
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
        interest = beginning_balance * interestRate;
        // calculate principal
        principal = monthlyPayment - interest;
        // calculate balance
        ending_balance = beginning_balance - principal;
        // calculate total interest
        totalInterest = totalInterest + interest;
        // calculate payment date
        paymentDate = new Date(
          paymentDate.setMonth(paymentDate.getMonth() + 1)
        );
        // create payment object
        payment = {
          paymentNumber: paymentNumber,
          paymentDate: paymentDate.toLocaleDateString(),
          beginning_balance: beginning_balance.toFixed(2),
          paymentAmount: this.monthlyPayment,
          principal: principal.toFixed(2),
          interest: interest.toFixed(2),
          ending_balance: ending_balance.toFixed(2),
        };
        // push payment object to payments array
        payments.push(payment);
        // increment payment number
        paymentNumber++;
      }
      // set total interest
      this.totalInterest = totalInterest;
      // set payments
      this.payments = payments;
      console.table(this.payments);
    },
    total_interest_rate(paymentFrequency) {
      let totalInterestRate = 0;
      // check if paymentFrequency is equal to 365
      if (paymentFrequency == 365) {
        totalInterestRate = this.interestRate / (365 / 12);
      }
      // check if paymentFrequency is equal to 52
      else if (paymentFrequency == 52) {
        totalInterestRate = this.interestRate / (52 / 12);
      }
      // check if paymentFrequency is equal to 2
      else if (paymentFrequency == 2) {
        totalInterestRate = this.interestRate / 2;
      }
      // check if paymentFrequency is equal to 1
      else if (paymentFrequency == 1) {
        totalInterestRate = this.interestRate;
      }
      return totalInterestRate;
    },
    clearForm() {
      // clear the form
      this.loanAmount = 0;
      this.loanTerm = 0;
      this.interestRate = 0;
      this.paymentFrequency = 0;
      this.show = false;
    },
    downloadPDF() {
      // get the table data
      let payments = this.payments;
      // get the table header
      let header = Object.keys(payments[0]);
      // create a new jsPDF instance
      let doc = new jsPDF("p", "pt");
      console.log(payments);
      // import jsPDF autoTable plugin and call autoTable function
      autoTable(doc, {
        head: [header],
        // display the body with the value of [payments] and convert it to string
        body: payments.map((payment) => {
          return header.map((key) => {
            return String(payment[key]);
          });
        }),
        theme: "grid",
        styles: {
          overflow: "linebreak",
          fontSize: 8,
        },
        columnStyles: {
          paymentNumber: { align: "center" },
          paymentDate: { align: "center" },
          beginning_balance: { align: "center" },
          paymentAmount: { align: "center" },
          principal: { align: "center" },
          interest: { align: "center" },
          ending_balance: { align: "center" },
        },
        margin: { top: 80 },
        // use didDrawPage
        didDrawPage: function (data) {
          // set font size
          doc.setFontSize(30);
          // set font type
          doc.setFont("helvetica");
          // set text color to red
          doc.setTextColor(255, 0, 0);
          // add text
          doc.text(
            "Amortization Schedule",
            data.settings.margin.left + 100,
            50
          );
        },
      });
      // save the pdf
      doc.save("table.pdf");
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

<style src="C:\Repositories\Banking System\src\styles.css"></style>
