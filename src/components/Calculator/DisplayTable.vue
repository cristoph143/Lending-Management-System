<template>
  <!-- <div class="table-responsive">
    <table class="table">
      <thead>
        <tr>
          <th>Payment Number</th>
          <th>Payment Date</th>
          <th>Beginning Balance</th>
          <th>Interest</th>
          <th>Principal</th>
          <th>Extra Payment</th>
          <th>Ending Balance</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(payment, index) in paymentTableData.payment_table" :key="index">
          <td>{{ payment.paymentNumber }}</td>
          <td>{{ payment.paymentDate }}</td>
          <td>{{ payment.beginning_balance }}</td>
          <td>{{ payment.interest }}</td>
          <td>{{ payment.principal }}</td>
          <td>{{ payment.extra_payment }}</td>
          <td>{{ payment.ending_balance }}</td>
        </tr>
      </tbody>
    </table>
  </div> -->
  <div>
    <q-table
      :columns="tableHeaders"
      :title=loan_type
        :data="paymentData"
        :rows-per-page-options="[5, 10, 15]"
        :pagination="true"
        
      row-key="paymentNumber"
      v-if="paymentData"
    />
    

    <q-spinner v-else />
    {{tableHeaders}}
    {{paymentTableData}}
  </div>
</template>


<script>
  import { mapState, mapGetters } from "vuex";
  export default {
    name: "DisplayTable",

    computed: {
      ...mapState({
        paymentTableData: (state) => state.loan_type.formula,
        tableHeaders: (state) => state.loan_type.formula.tableHeaders.map(header => ({
        name: header.name,
        field: header.field,
        sortable: true // add any other properties you need
      })),
        loan_type: (state) => state.loan_type.formula.loan_type,
      }),
      showPaymentTable() {
        console.log("paymentTableData" + this.paymentTableData);
        return this.paymentTableData.length > 0;
      },
      ...mapGetters(['paymentTableData']),
    paymentData() {
      // Get the payment data from the paymentTableData getter
      const paymentData = this.paymentTableData;

      // If the payment data is null, return null to indicate that it's not available yet
      if (!paymentData) {
        return null;
      }

      // Otherwise, return the payment data
      return paymentData;
    },
    },
    methods: {
      updateEndingBalances(rowIndex) {
        let currentBalance = parseFloat(this.tableData[rowIndex][2]);
        let extraPayment = parseFloat(this.tableData[rowIndex][3]);
        let endingBalance = parseFloat(this.tableData[rowIndex][4]);
        endingBalance = currentBalance - extraPayment;
        this.$store.commit("updateEndingBalance", { rowIndex, endingBalance });

        for (let i = rowIndex + 1; i < this.tableData.length; i++) {
          currentBalance = endingBalance;
          extraPayment = parseFloat(this.tableData[i][3]);
          endingBalance = currentBalance - extraPayment;
          this.$store.commit("updateEndingBalance", {
            rowIndex: i,
            endingBalance,
          });
        }
      },
    },
    created() {
      console.log(this.tableData);
      console.log(this.tableHeaders);
      console.log(this.loan_type);
    },
  };
</script>

<style></style>
