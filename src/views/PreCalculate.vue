<template>
  <Vueform
    validate-on="step|change"
    :force-labels="true"
    :float-placeholders="true"
    :display-errors="true"
    :display-messages="true"
  >
    <CalcTabLayout />
  </Vueform>
  <h1>hello</h1>
</template>

<script>
  import CalcTabLayout from "@/components/CalcTabLayout";
  import store from "@/store"; // import the store
  export default {
    name: "PreCalculate",
    components: {
      CalcTabLayout,
    },
    created() {
      this.$store = store;
      console.log(this.$store);
    },
  };
</script>

<style src="../assets/css/calculator_tabs.css" scoped></style>
