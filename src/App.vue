<template>
  <header>
    <HeaderComponent />
  </header>
  <router-view />
</template>

<script>
  /* eslint-disable */
  import TheNavigation from "@/components/Layouts/TheNavigation";
  import store from "@/store"; // import the store
  import HeaderComponent from "./components/Layouts/HeaderComponent.vue";
  
  export default {
    name: "App",
    components: {
      TheNavigation,
      HeaderComponent,
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
