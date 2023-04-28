<template>
  <Vueform
    ref="vueform"
    size="md"
    :display-errors="true"
    validate-on="step|change"
    :display-messages="true"
    add-class="formClass"
  >
    <GroupElement name="container">
      <SliderElement
        :name="loanAmountName"
        :label="loanAmountLabel"
        :rules="loanRules"
        :field-name="loanAmountFieldName"
        :default="loanAmountDefault"
        :max="loanAmountMax"
        :min="loanAmountMin"
        :id="loanAmountId"
      />
      <SliderElement
        :name="loanTermName"
        :label="loanTermLabel"
        :rules="loanRules"
        :field-name="loanTermFieldName"
        :default="loanTermDefault"
        :max="loanTermMax"
        :min="loanTermMin"
        :id="loanTermId"
      />
      <SelectElement
        :name="paymentFrequencyName"
        :items="paymentFrequencyItems"
        :label="paymentFrequencyLabel"
        :field-name="paymentFrequencyFieldName"
        :rules="paymentFrequencyRules"
        :id="paymentFrequencyId"
        :default="paymentFrequencyDefault"
      />
    </GroupElement>
    <StaticElement name="divider_1" :content="dividerContent" />
    <ButtonElement
      name="calculate_copy"
      button-label="Calculate"
      id="calculate"
      :columns="{
        container: 4,
      }"
      @click="calculatePayment"
    />
    <ButtonElement
      name="reset"
      button-label="Reset"
      :secondary="true"
      :resets="true"
      :columns="{
        container: 3,
      }"
      :conditions="resetConditions"
    />
  </Vueform>
</template>

<script>
  import store from "@/store"; // import the store
  import { mapState } from "vuex";
  export default {
    name: "LoanCalculator",
    data() {
      return {
        paymentFrequencyId: "payment_frequency",
        paymentFrequencyFieldName: "Payment Frequency",
        paymentFrequencyLabel: "Payment Frequency",
        formClass: "vf-loan-calculator",
        loanAmountName: "loanAmount",
        loanAmountLabel: "Loan amount",
        loanRules: ["required"],
        loanAmountFieldName: "loan-amount",
        loanAmountDefault: 1,
        loanAmountMax: 10000,
        loanAmountMin: 1,
        loanAmountId: "loan-amount-slider",
        loanTermName: "loanTerm",
        loanTermLabel: "Loan term",
        loanTermFieldName: "loan-term",
        loanTermDefault: 1,
        loanTermMax: 28,
        loanTermMin: 1,
        loanTermId: "loan-term-slider",
        paymentFrequencyName: "paymentFrequency",
        paymentFrequencyItems: [
          {
            value: "365",
            label: "Daily",
          },
          {
            value: "52",
            label: "Weekly",
          },
          {
            value: "2",
            label: "Twice a Month",
          },
          {
            value: "1",
            label: "Monthly",
          },
        ],
        paymentFrequencyRules: ["required"],
        paymentFrequencyDefault: "365",
        dividerContent: '<hr :style="dividerStyles" />',
        dividerStyles: {
          borderColor: "#d1d5db",
          marginTop: "8px",
          paddingBottom: "8px",
        },
        resetConditions: [
          [
            ["container.loanAmount", ">", "1"],
            ["container.loanTerm", ">", "1"],
            ["container.paymentFrequency", "not_in", ["365"]],
          ],
        ],
      };
    },
    computed: {
      ...mapState({
        loan_type: (state) => state.loan_type.loan_type,
      }),
    },
    created() {
      this.$store = store;
      console.log(this.loan_type);
    },
    methods: {
      calculatePayment() {
        // Get the form data
        const formData = this.$refs.vueform.data;
        console.log(formData);

        // Do the calculation based on the form data
        // const paymentAmount =
        //   formData.loanAmount / (formData.loanTerm * formData.paymentFrequency);

        // // Log the payment amount
        // console.log(paymentAmount);
      },
      resetForm() {
        // Reset the form to its initial values
        this.$refs.vueform.resetForm();
      },
    },
  };
</script>
