<template>
  <Vueform
    ref="vueform"
    size="md"
    :display-errors="true"
    validate-on="step|change"
    :display-messages="true"
    :force-labels="true"
    :float-placeholders="true"
  >
    <GroupElement name="container">
      <TextElement
        name="amountDue"
        input-type="number"
        :rules="rules"
        label="Amount Due"
        id="amount_due"
        field-name="Amount Due"
        :default="amountDue"
        :v-model="formData.amountDue"
        @change="onChange('amountDue', $event)"
      />
      <DateElement
        v-for="(date, index) in dates"
        :key="index"
        :name="date"
        :label="capitalize(date)"
        :id="date"
        :rules="rules[0]"
        :field-name="capitalize(date)"
        :display-format="date_format"
        :value-format="date_format"
        :load-format="date_format"
        :v-model="formData[date]"
        :default="getCurrentDate()"
        @change="onChange(date, $event)"
      />
    </GroupElement>
    {{ formData.dueDate }}f
    <StaticElement name="divider_1" :content="dividerContent" />
    <ButtonElement
      name="calculate_copy"
      button-label="Calculate"
      duration="10000"
      id="calculate"
      :columns="{
        container: 4,
      }"
      @click="calculatePayment"
    />
    <ErrorPopUp
      :errorMessage="errorMessage"
      v-if="showError"
      @close="hideError"
    />

    <ButtonElement
      name="reset"
      button-label="Reset"
      :secondary="true"
      :resets="true"
      :columns="{
        container: 3,
      }"
      :conditions="conditions"
    />
  </Vueform>
</template>

<script>
  import store from "@/store"; // import the store
  import ErrorPopUp from "./ErrorPop-Up.vue";
  import { mapState, mapGetters, mapActions, mapMutations } from "vuex";

  export default {
    name: "PenaltyCalculator",
    computed: {
      ...mapState({
        errorMessage: (state) => state.loan_type.penalty_calculator,
        dates: (state) => state.loan_type.penalty_calculator.dates,
        formData: (state) => state.loan_type.penalty_calculator.formData,
        amountDue: (state) => state.loan_type.penalty_calculator.amountDue,
        add_class: (state) => state.loan_type.penalty_calculator.add_class,
        date_format: (state) => state.loan_type.penalty_calculator.date_format,
        dividerContent: (state) => state.loan_type.penalty_calculator.dividerContent,
        dividerStyles: (state) => state.loan_type.penalty_calculator.dividerStyles,
        rules: (state) => state.loan_type.penalty_calculator.rules,
        conditions: (state) => state.loan_type.penalty_calculator.conditions,
        showError: (state) => state.loan_type.penalty_calculator.showError,
        loan_type: (state) => state.loan_type.loan_type.loan_type,
      }),
      ...mapGetters("penaltyCalculator", {
        getCurrentDate: "getCurrentDate",
        capitalize: "capitalize",
      }),
    },
    created() {
      this.$store = store;
      console.log(this.errorMessage);
      try {
        console.log(this.errorMessage);
        console.log(this.dates);
        console.log(this.formData);
        console.log(this.amountDue);
        console.log(this.add_class);
        console.log(this.date_format);
        console.log(this.dividerContent);
        console.log(this.dividerStyles);
        console.log(this.rules);
        console.log(this.conditions);
        console.log(this.showError);
      } catch (error) {
        console.error(error);
      }
    },
    methods: {
      ...mapActions("penaltyCalculator", {
        calculatePayment: "calculatePayment",
        resetForm: "resetForm",
      }),
      ...mapMutations("penaltyCalculator", {
        setError: "setError",
        onChange: "onChange",
        hideError: "hideError",
      }),
    },
    components: {
      ErrorPopUp,
    },
  };
</script>
