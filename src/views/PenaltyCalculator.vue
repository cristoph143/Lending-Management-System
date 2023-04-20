<template>
  <!-- penalty calculator -->
  <div class="container">
    <div class="row">
      <h1>Penalty Calculator</h1>
    </div>
    <div class="row">
      <div class="form-group">
        <!-- penalty rate per month -->
        <label for="penaltyRate">Penalty Rate (%)Per Month</label>
        <input
          type="number"
          class="form-control"
          id="penaltyRate"
          placeholder="Enter Penalty Rate"
          v-model="penaltyRate"
        />
        <!-- amount due -->
        <label for="amountDue">Amount Due</label>
        <input
          type="number"
          class="form-control"
          id="amountDue"
          placeholder="Enter Amount Due"
          v-model="amountDue"
        />
        <!-- due date -->
        <label for="dueDate">Due Date</label>
        <input
          type="date"
          class="form-control"
          id="dueDate"
          placeholder="Enter Due Date"
          v-model="dueDate"
        />
        <!-- actual payment date -->
        <label for="actualPaymentDate">Actual Payment Date</label>
        <input
          type="date"
          class="form-control"
          id="actualPaymentDate"
          placeholder="Enter Actual Payment Date"
          v-model="actualPaymentDate"
        />

        <!-- submit button to calculate -->
        <button type="button" class="btn btn-primary" @click="calculatePenalty">
          Calculate
        </button>
      </div>
      <div class="show" v-if="!show">
        <h2>
          Penalty is a fee charged by the lender for the delay in repayment of
          the loan. <br />
          The penalty is charged on the outstanding loan amount.
        </h2>
      </div>
      <div class="form-group show" v-if="show">
        <!-- read only penalty rate per day -->
        <label for="penaltyRatePerDay">Penalty Rate (%)Per Day</label>
        <input
          type="number"
          class="form-control"
          id="penaltyRatePerDay"
          placeholder="Penalty Rate Per Day"
          v-model="penaltyRatePerDay"
          readonly
        />
        <!-- readOnly number of days late -->
        <label for="numberOfDaysLate">Number of Days Late</label>
        <input
          type="number"
          class="form-control"
          id="numberOfDaysLate"
          placeholder="Number of Days Late"
          v-model="numberOfDaysLate"
          readonly
        />
        <!-- readOnly penalty due percent -->
        <label for="penaltyDuePercent">Total Penalty Due(%)</label>
        <input
          type="number"
          class="form-control"
          id="penaltyDuePercent"
          placeholder="Total Penalty Due(%)"
          v-model="penaltyDuePercent"
          readonly
        />
        <!-- readOnly total penalty due amount -->
        <label for="totalPenaltyDue">Total Penalty Due</label>
        <input
          type="number"
          class="form-control"
          id="totalPenaltyDue"
          placeholder="Total Penalty Due"
          v-model="totalPenaltyDue"
          readonly
        />
        <!-- clear button -->
        <button type="button" class="btn btn-primary" @click="clear">
          Clear
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PenaltyCalculator",
  data() {
    return {
      penaltyRate: 0,
      penaltyRatePerDay: 0,
      amountDue: 0,
      dueDate: "",
      actualPaymentDate: "",
      numberOfDaysLate: 0,
      penaltyDuePercent: 0,
      totalPenaltyDue: 0,
      show: false,
    };
  },
  methods: {
    calculatePenalty() {
      this.show = true;
      // calculate penalty rate per day
      this.penaltyRatePerDay = this.penaltyRate / 30;
      // calculate number of days late
      this.numberOfDaysLate = this.calculateDaysLate(
        this.dueDate,
        this.actualPaymentDate
      );
      // calculate penalty due percent
      this.penaltyDuePercent = (
        this.penaltyRatePerDay * this.numberOfDaysLate
      ).toFixed(2);
      // calculate total penalty due
      this.totalPenaltyDue = (
        this.amountDue *
        (this.penaltyDuePercent / 100)
      ).toFixed(2);
    },
    calculateDaysLate(dueDate, actualPaymentDate) {
      // convert due date and actual payment date to date objects
      const dueDateObj = new Date(dueDate);
      const actualPaymentDateObj = new Date(actualPaymentDate);
      // calculate number of days late
      const timeDiff = Math.abs(
        actualPaymentDateObj.getTime() - dueDateObj.getTime()
      );
      const numberOfDaysLate = Math.ceil(timeDiff / (1000 * 3600 * 24));
      return numberOfDaysLate;
    },
    clear() {
      this.penaltyRate = 0;
      this.penaltyRatePerDay = 0;
      this.amountDue = 0;
      this.dueDate = "";
      this.actualPaymentDate = "";
      this.numberOfDaysLate = 0;
      this.penaltyDuePercent = 0;
      this.totalPenaltyDue = 0;
      this.show = false;
    },
  },
};
</script>

<style>
.container {
  margin: 0 auto;
  width: 50%;
  display: flex;
  flex-direction: column;
}

.row {
  margin: 0 auto;
  width: 100%;
  display: flex;
}

.form-group {
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.btn {
  margin: 0 auto;
  width: 100%;
}
</style>
