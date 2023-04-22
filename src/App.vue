<template>
  <nav>
    <TheNavigation />
  </nav>
  <router-view />
</template>

<script>
  /* eslint-disable */
  import TheNavigation from "@/components/TheNavigation";
  import store from "@/store"; // import the store

  export default {
    name: "App",
    components: {
      TheNavigation,
    },
    // register the store with the Vue instance
    created() {
      this.$store = store;
      console.log(this.$store);
    },
  };
</script>

<style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
