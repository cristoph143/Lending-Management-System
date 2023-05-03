<template>
  {{ this.$route.params.slug }}
</template>

<script>
  import store from "@/store"; // import the store
  import { mapState } from "vuex";

  export default {
    name: "CalculateView",
    computed: {
      ...mapState({
        loan_type: (state) => state.loan_type.loan_type.loan_type,
      }),
      currentSlug() {
        if (this.$route.params.slug) {
          return this.$route.params.slug;
        }
        return "";
      },
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
