<template>
  <Vueform ref="vueform" size="md" validate-on="step|change">
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
        :label="capitalizedLabels[index]"
        :id="date"
        :rules="rules[0]"
        :field-name="capitalizedLabels[index]"
        :display-format="date_format"
        :value-format="date_format"
        :load-format="date_format"
        :v-model="formData[date]"
        :default="getCurrentDate"
        @change="onChange(date, $event)"
        :capitalized-label="capitalizedDateLabel"
      />
    </GroupElement>
    <StaticElement name="divider_1" :content="dividerContent" />
    <ButtonElement
      name="calculate_copy"
      button-label="Calculate"
      duration="10000"
      id="calculate"
      :columns="{
        container: 4,
      }"
      @click="triggerCalculatePayment"
    />
    <div >Payment Result: {{ paymentResult }}</div>

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
  import { mapState, mapGetters, mapActions } from "vuex";

  export default {
    name: "PenaltyCalculator",
    props: {
      // Define props here
      default: {
        type: [String, Date, Function],
        default: null,
      },
      capitalizedLabel: {
        type: Function,
        required: true,
      },
    },
    data() {
      return {
        capitalizedLabels: [],
      };
    },
    watch: {
      dates: {
        handler: function (newDates) {
          Promise.all(
            newDates.map((date) => {
              return this.capitalizedDateLabel(date);
            })
          ).then((capitalizedLabels) => {
            this.capitalizedLabels = capitalizedLabels;
          });
        },
        immediate: true,
      },
    },
    computed: {
      ...mapGetters("penalty_calculator", ["getCurrentDate"]),
      ...mapState({
        loan_type: (state) => state.destinationsStore.loan_type.loan_type,
        currentDate: (state) => state.loan_type.getCurrentDate,
      }),
      currentDate() {
        return this.getCurrentDate;
      },
      paymentResult() {
        return this.$store.getters["penalty_calculator/paymentResult"];
      },
      ...mapState("penalty_calculator", [
        "errorMessage",
        "dates",
        "formData",
        "amountDue",
        "add_class",
        "date_format",
        "dividerContent",
        "dividerStyles",
        "rules",
        "conditions",
        "showError",
      ]),
    },
    methods: {
      ...mapActions("penalty_calculator", [
        "setError",
        "onChange",
        "capitalizeString",
        "calculatePayment",
        "resetForm",
        "fetchCurrentDate",
      ]),
      onChange(date, value) {
        this.formData[date] = value;
      },
      triggerCalculatePayment() {
        this.$store
          .dispatch("penalty_calculator/calculatePayment")
          .catch((error) => {
            console.error(error); // Log the error
          });
      },
      capitalizedDateLabel(str) {
        return new Promise((resolve, reject) => {
          this.$store
            .dispatch("penalty_calculator/capitalizeString", str.toString())
            .then((result) => {
              console.log(result); // Log the result
              resolve(result);
            })
            .catch((error) => {
              console.error(error); // Log the error
              reject(error);
            });
        });
      },
    },
    create(){
      console.log(this.$store.paymentResult)
    }
  };
</script>
