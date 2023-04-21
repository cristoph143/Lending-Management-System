<template>
  <TheCalcLayout />
  <div id="app">
    <Vueform>
      <TextElement name="hello_world" label="Hello" placeholder="World" />
    </Vueform>
  </div>
</template>

<script>
  import TheCalcLayout from "../components/TheCalcLayout.vue";
  export default {
    components: {
      TheCalcLayout,
    },
  };
</script>

<style src="../assets/css/main.css"></style>

