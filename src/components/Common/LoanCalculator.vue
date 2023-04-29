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
        v-for="(sliderData, index) in slidersData"
        :key="index"
        :name="sliderData.name"
        :label="sliderData.label"
        :rules="rules"
        :field-name="sliderData.label"
        :default="min"
        :max="sliderData.max"
        :min="min"
        :id="sliderData.name"
      />
      <SelectElement
        :name="paymentFrequency.name"
        :items="paymentFrequency.items"
        :label="paymentFrequency.label"
        :field-name="paymentFrequency.label"
        :rules="rules"
        :id="paymentFrequency.name"
        :default="paymentFrequency.default"
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
        rules: ["required"],
        min: 1,
        slidersData: [
          {
            name: "loanAmount",
            label: "Loan amount",
            max: 10000
          },
          {
            name: "loanTerm",
            label: "Loan term",
            max: 28
          },
        ],
        paymentFrequency: {
          name: "paymentFrequency",
          label: "Payment Frequency",
          default: "365",
          items: [
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
        },
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
      },
      resetForm() {
        // Reset the form to its initial values
        this.$refs.vueform.resetForm();
      },
    },
  };
</script>
