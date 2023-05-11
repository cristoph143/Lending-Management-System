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
      <TextElement
        v-for="(inputData, index) in inputsData"
        input-type="number"
        :key="index"
        :name="inputData.name"
        :label="inputData.label"
        :rules="rules"
        :field-name="inputData.label"
        :default="min"
        :min="min"
        :id="inputData.name"
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
      <DateElement
        name="date"
        label="Starting Date"
        id="date"
        field-name="Starting Date"
        :display-format="date_format"
        :value-format="date_format"
        :load-format="date_format"
        :default="getCurrentDate"
        :v-model="startingDate"
        :disabled-dates="disabledDates"
        @change="onChange($event)"
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
  import { mapGetters, mapState, mapActions } from "vuex";
  import { disabledDates } from "../../store/modules/common/shared";
  export default {
    name: "LoanCalculator",
    data() {
      return {
        startingDate: new Date(),
      };
    },
    props: {
      // Define props here
      default: {
        type: [String, Date, Function],
        default: null,
      },
      loanType: {
        type: String,
        // required: true,
      },
    },
    computed: {
      ...mapState({
        loan_type: (state) => state.destinationsStore.loan_type.loan_type,
      }),
      currentDate() {
        return this.getCurrentDate;
      },
      ...mapGetters("penalty_calculator", ["getCurrentDate"]),
      ...mapState("loanCalculator", [
        "inputsData",
        "paymentFrequency",
        "dividerContent",
        "rules",
        "min",
        "resetConditions",
        "starting_date",
      ]),
      ...mapState("penalty_calculator", ["date_format"]),
      ...mapGetters("penalty_calculator", ["getCurrentDate"]),
    },
    methods: {
      disabledDates() {
        return disabledDates;
      },
      onChange(value) {
        console.log(value);
        this.starting_date = value;
      },
      ...mapActions("loanCalculator", ["calculatePayment"]),
      triggerCalculatePayment() {
        const formData = this.$refs.vueform.data;
        const loan_type = this.$route.params.slug;
        formData["loan_type"] = loan_type;
        formData["starting_date"] = this.starting_date;
        console.log(formData);
        console.log(this.starting_date);
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
