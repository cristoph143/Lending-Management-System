<template>
  <Vueform
    ref="vueform"
    size="md"
    :display-errors="true"
    validate-on="step|change"
    :display-messages="true"
    :force-labels="true"
    :float-placeholders="true"
    :add-class="add_class"
  >
    <GroupElement name="container">
      <TextElement
        name="amountDue"
        input-type="number"
        :rules="rules"
        autocomplete="off"
        label="Amount Due"
        id="amount_due"
        field-name="Amount Due"
        :default="amountDue"
      />
      <DateElement
        name="dueDate"
        label="Due Date"
        id="dueDate"
        :rules="rules1"
        field-name="Due Date"
        :display-format="date_format"
        :value-format="date_format"
        :load-format="date_format"
        :v-model="dueDate"
        :default="getCurrentDate()"
      />
      <DateElement
        name="actualDate"
        label="Actual Date"
        id="actualDate"
        :rules="rules1"
        field-name="Actual Date"
        :display-format="date_format"
        :value-format="date_format"
        :load-format="date_format"
        v-model="actualDate"
        :default="getCurrentDate()"
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
      :conditions="Conditions"
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
      :conditions="Conditions"
    />
  </Vueform>
</template>

<script>
  import store from "@/store"; // import the store
  import { mapState } from "vuex";
  export default {
    name: "PenaltyCalculator",
    data() {
      return {
        amountDue: "0",
        add_class: "vf-penalty-calculator",
        date_format: "MMMM D YYYY",
        dividerContent: '<hr :style="dividerStyles" />',
        dividerStyles: {
          borderColor: "#d1d5db",
          marginTop: "8px",
          paddingBottom: "8px",
        },
        rules: ["required", "numeric"],
        rules1: ["required"],
        Conditions: [
          ["container.amountDue", "not_empty"],
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
        actualDate: "",
        dueDate: "",
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
      getCurrentDate() {
        const currentDate = new Date();
        const day = currentDate.getDate();
        const month = currentDate.toLocaleString("default", { month: "long" });
        const year = currentDate.getFullYear();
        const formattedDate = `${month} ${day} ${year}`;
        return formattedDate;
      },
      calculatePayment() {
        // Get the form data
        const formData = this.$refs.vueform.data;

        console.log(formData);
        console.log(this.dueDate);
        console.log(this.actualDate);
        console.log(this.getCurrentDate());
      },
      resetForm() {
        // Reset the form to its initial values
        this.$refs.vueform.resetForm();
      },
    },
  };
</script>
