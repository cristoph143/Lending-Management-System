<template>
  {{ this.$route.params.slug }}
  {{ penaltyResult }}
</template>

<script>
  import store from "@/store"; // import the store
  import { mapState } from "vuex";

  export default {
    name: "CalculateView",
    computed: {
      ...mapState({
        loan_type: (state) => state.destinationsStore.loan_type.loan_type,
        penaltyResult: (state) => state.loan_type.formula.penaltyResult,
      }),
      currentSlug() {
        if (this.$route.params.slug) {
          return this.$route.params.slug;
        }
        return "";
      },
    },
    mounted() {
      console.log(this.penaltyResult); // This will log the penaltyResult object
    },
    created() {
      this.$store = store;
      console.log(this.loan_type);
    },
    methods: {
      goToDestination(slug) {
        this.$router.push({
          name: "calculate-view",
          params: {
            slug: slug,
          },
        });
      },
    },
  };
</script>
