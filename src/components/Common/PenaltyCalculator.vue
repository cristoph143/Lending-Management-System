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
  import { mapState } from "vuex";
  import ErrorPopUp from "./ErrorPop-Up.vue";

  export default {
    name: "PenaltyCalculator",
    data() {
      return {
        errorMessage: "",
        dates: ["dueDate", "actualDate"],
        formData: {
          amountDue: 0,
          dueDate: this.getCurrentDate(),
          actualDate: this.getCurrentDate(),
        },
        amountDue: "0",
        add_class: "vf-penalty-calculator",
        date_format: "MMMM D, YYYY",
        dividerContent: '<hr :style="dividerStyles" />',
        dividerStyles: {
          borderColor: "#d1d5db",
          marginTop: "8px",
          paddingBottom: "8px",
        },
        rules: ["required", "numeric", "min:0"],
        conditions: [
          ["container.amountDue", ">", "1"],
          [
            ["container.actualDate", "not_empty"],
            ["container.actualDate", "before", "today"],
            ["container.actualDate", "after", "today"],
          ],
          [
            ["container.dueDate", "not_empty"],
            ["container.dueDate", "before", "today"],
            ["container.dueDate", "after", "today"],
          ],
        ],
        showError: false,
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
      setError() {
        this.showError = true;
      },
      onChange(date, event) {
        console.log(date, event);
        this.formData[date] = event;
      },
      capitalize(str) {
        let result = str.replace(/([A-Z])/g, " $1");
        return result.charAt(0).toUpperCase() + result.slice(1);
      },
      getCurrentDate() {
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        return formattedDate;
      },
      calculatePayment() {
        const errors = [];

        if (this.formData.amountDue < 1) {
          errors.push("Amount due should be greater than 1.");
        }

        if (this.formData.actualDate == this.formData.dueDate) {
          errors.push("Actual date should be the same as the due date.");
        }

        if (errors.length > 0) {
          this.errorMessage = errors[0];
          errors.shift();
          this.errors = errors;
          this.$nextTick(() => {
            this.showError = true;
            setTimeout(() => {
              this.hideError();
            }, 2000);
          });
        } else {
          console.log(this.formData);
        }
      },
      hideError() {
        if (this.errors.length > 0) {
          this.errorMessage = this.errors[0];
          this.errors.shift();
          this.$nextTick(() => {
            this.showError = true;
            setTimeout(() => {
              this.hideError();
            }, 2000);
          });
        } else {
          this.showError = false;
        }
      },
      resetForm() {
        // Reset the form to its initial values
        this.$refs.vueform.resetForm();
      },
    },
    components: {
      ErrorPopUp,
    },
  };
</script>
