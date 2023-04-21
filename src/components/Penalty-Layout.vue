<template>
  <h1>s</h1>
  <GroupElement name="body_copy3">
    <GroupElement
      name="column1"
      :columns="{
        container: 6,
      }"
    >
      <TextElement
        name="Amount Due"
        label="Amount Due"
        input-type="number"
        default="0"
        id="amount_due"
        :rules="['required']"
        field-name="Amount Due"
      />
      <DateElement
        name="Actual Payment  Date"
        label="Actual Payment  Date"
        id="actual_date"
        :rules="['required']"
        field-name="Payment Date"
      />
      <DateElement
        name="Due Date"
        label="Due Date"
        id="due_date"
        :rules="['required']"
        field-name="Due Date"
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
            :conditions="[
              ['body_copy3.column1.Amount Due', 'not_empty'],
              ['body_copy3.column1.Actual Payment  Date', 'not_empty'],
              ['body_copy3.column1.Due Date', 'not_empty'],
            ]"
          />
        </GroupElement>
      </GroupElement>
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
</template>

<script>
  export default {
    name: "PenaltyLayout",
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
