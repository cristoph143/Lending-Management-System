<template>
  <div>
    <h1>Calculate View for {{ $route.params.slug }}</h1>
    <!-- Add your calculation details display code here -->
  </div>
</template>

<script>
  import store from "@/store"; // import the store
  import { mapState } from "vuex";
  export default {
    name: "CalculateView",
    computed: {
      ...mapState({
        destinations: (state) => state.destination.destinations,
      }),
    },
    created() {
      this.$store = store;
      console.log(this.destinations);
    },
  };
</script>
