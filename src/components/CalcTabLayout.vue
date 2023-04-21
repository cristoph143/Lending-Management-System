<template>
  <FormTabs>
    <FormTab name="page0" label="Diminishing Interest" :elements="['body']" />
    <FormTab name="page1" label="Fixed Interest" :elements="[]" />
    <FormTab name="page2" label="Lump Sum" :elements="[]" />
    <FormTab name="page3" label="Penalty Calculator" :elements="[]" />
  </FormTabs>
  <!-- tabs wirh -->
</template>

<script>
  export default {};
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
