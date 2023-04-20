<template>
  <div class="home">
    <TheCalcLayout />
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

<style>
  .home {
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  /* make the outline of the boxes 2 at the top and 2 at the bottom */
  .box {
    display: inline-block;
    width: 200px;
    height: 200px;
    margin: 20px;
    border: 1px solid black;
  }

  .btn {
    background-color: #4caf50; /* Green */
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
  }
</style>
