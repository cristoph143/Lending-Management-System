<template>
  <GroupElement
    name="column1"
    :columns="{
      container: 6,
    }"
  >
    <SliderElement
      name="Loan Amount"
      label="Loan Amount"
      :default="30"
      :min="2500"
      :rules="['required']"
      id="loan_amount"
      field-name="Loan Amount"
      :max="10000"
    />
    <SliderElement
      name="Loan Term"
      label="Loan Term"
      :default="30"
      field-name="Loan Term"
      :max="10"
      :min="1"
      :rules="['required']"
      id="loan_term"
    />
    <SelectElement
      name="Payment Frequency"
      :items="[
        {
          value: 'Daily',
          label: 'Daily',
        },
        {
          value: 'Weekly',
          label: 'Weekly',
        },
        {
          value: 'Twice a Month',
          label: 'Twice a Month',
        },
        {
          value: 'Monthly',
          label: 'Monthly',
        },
      ]"
      :search="true"
      :native="false"
      label="Payment Frequency"
      input-type="search"
      autocomplete="on"
      :rules="['required']"
      id="payment_id"
      field-name="Payment Frequency"
    />
    <GroupElement name="container2">
      <GroupElement
        name="column1"
        :columns="{
          default: {
            container: 6,
          },
          lg: {
            container: 4,
          },
        }"
      >
        <ButtonElement name="submit" button-label="Submit" :submits="true" />
      </GroupElement>
      <GroupElement
        name="column2"
        :columns="{
          container: 6,
        }"
      >
        <ButtonElement
          name="reset"
          button-label="Reset"
          :secondary="true"
          :resets="true"
          :conditions="[['body.column1.Payment Frequency', 'not_empty']]"
        />
      </GroupElement>
    </GroupElement>
    <GroupElement
      name="column2"
      :columns="{
        container: 6,
      }"
    >
      <StaticElement
        name="info"
        content="<div class='payment-info'><h1>Payment Information</h1></div>"
      />
      <StaticElement name="divider" content="<div class='divider'><hr></div>" />
      <GroupElement name="table_container">
        <GroupElement name="table">
          <StaticElement
            name="h1"
            content="<div class='table'><h1>Lorem ipsum dolor</h1></div>"
          />
        </GroupElement>
        <GroupElement name="table_actions">
          <GroupElement
            name="column1"
            :columns="{
              default: {
                container: 6,
              },
              lg: {
                container: 4,
              },
            }"
          >
            <ButtonElement name="Apply Now" button-label="Apply Now" />
          </GroupElement>
          <GroupElement
            name="column2"
            :columns="{
              container: 6,
            }"
          >
            <ButtonElement
              name="secondaryButton"
              button-label="Download PDF"
              :secondary="true"
            />
          </GroupElement>
        </GroupElement>
      </GroupElement>
    </GroupElement>
  </GroupElement>
</template>

<script>
  export default {
    name: "CalcLayout",
    props: {
      diminishingInterest: String,
      fixedInterest: String,
      lumpsum: String,
      penaltyCalculator: String,
    },
  };
</script>

<style src="../assets/css/calculator_tabs.css" scoped>
  .payment-info h1 {
    font-size: 36px;
    font-weight: 600;
  }
  .divider hr {
    border-color: #d1d5db;
    margin-top: 3px;
    padding-bottom: 3px;
  }
  .table h1 {
    font-size: 36px;
    font-weight: 600;
    line-height: 1.5;
  }
</style>
