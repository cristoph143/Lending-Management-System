<template>
  <Vueform
    size="md"
    :display-errors="true"
    validate-on="step|change"
    :display-messages="true"
    add-class="vf-loan-calculator"
  >
    <GroupElement name="container">
      <SliderElement
        :name="loanAmountName"
        :label="loanAmountLabel"
        :rules="loanAmountRules"
        :field-name="loanAmountFieldName"
        :default="loanAmountDefault"
        :max="loanAmountMax"
        :min="loanAmountMin"
        :id="loanAmountId"
      />
      <SliderElement
        :name="loanTermName"
        :label="loanTermLabel"
        :rules="loanTermRules"
        :field-name="loanTermFieldName"
        :default="loanTermDefault"
        :max="loanTermMax"
        :min="loanTermMin"
        :id="loanTermId"
      />
      <SelectElement
        :name="paymentFrequencyName"
        :items="paymentFrequencyItems"
        :search="paymentFrequencySearch"
        :native="paymentFrequencyNative"
        :label="paymentFrequencyLabel"
        :input-type="paymentFrequencyInputType"
        :autocomplete="paymentFrequencyAutocomplete"
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
      :submits="true"
      id="calculate"
      :columns="{
        container: 4,
      }"
    />
    <ButtonElement
      name="reset"
      button-label="Reset"
      :secondary="true"
      :resets="true"
      :columns="{
        container: 3,
      }"
    />
  </Vueform>
</template>

<script>
  export default {
    name: "LoanCalculator",
    data() {
      return {
        displayErrors: true,
        displayMessages: true,
        formClass: "vf-loan-calculator",
        loanAmountName: "loanAmount",
        loanAmountLabel: "Loan amount",
        loanAmountRules: ["required"],
        loanAmountFieldName: "loan-amount",
        loanAmountDefault: 1,
        loanAmountMax: 10000,
        loanAmountMin: 1,
        loanAmountId: "loan-amount-slider",
        loanTermName: "loanTerm",
        loanTermLabel: "Loan term",
        loanTermRules: ["required"],
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
        paymentFrequencyRules: ["required", "unique"],
        paymentFrequencyDefault: "365",
        dividerContent: '<hr :style="dividerStyles" />',
        dividerStyles: {
          borderColor: "#d1d5db",
          marginTop: "8px",
          paddingBottom: "8px",
        },
        resetConditions: [
          [
            ["container_1", "container"],
            [
              {
                name: "loanAmount",
                value: 1,
              },
              {
                name: "loanTerm",
                value: 1,
              },
              {
                name: "paymentFrequency",
                value: "365",
              },
            ],
          ],
        ],
      };
    },
    methods: {
      calculatePayment() {
        // Calculate the payment based on the input values
        // ...
      },
      resetForm() {
        // Reset the form to its initial values
        // ...
      },
    },
  };
</script>

