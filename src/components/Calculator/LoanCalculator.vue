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
      @click="triggerCalculatePayment"
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
  import { mapState, mapActions } from "vuex";

  export default {
    name: "LoanCalculator",
    props: {
      // Define props here
      default: {
        type: [String, Function],
        default: null,
      },
      loanType: {
        type: String,
        required: true,
      },
    },
    computed: {
      ...mapState({
        loan_type: (state) => state.destinationsStore.loan_type.loan_type,
      }),
      ...mapState("loanCalculator", [
        "slidersData",
        "paymentFrequency",
        "dividerContent",
        "rules",
        "min",
        "resetConditions",
      ]),
    },
    methods: {
      ...mapActions("loanCalculator", ["calculatePayment"]),
      triggerCalculatePayment() {
        const formData = this.$refs.vueform.data;
        const loan_type = this.$route.params.slug;
        formData['loan_type'] = loan_type;
        console.log(formData);
        this.$store
          .dispatch("loanCalculator/calculatePayment", {
            formData,
          })
          .catch((error) => {
            console.error(error); // Log the error
          });
      },
    },
  };
</script>
