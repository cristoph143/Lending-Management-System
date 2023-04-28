<template>
  <div class="container">
    <div class="tabs">
      <router-link
        v-for="loan_type in loan_types"
        :key="loan_type.slug"
        :to="{ name: 'calculate-view', params: { slug: loan_type.slug } }"
        :class="{ 'active-tab': currentSlug === loan_type.slug }"
      >
        {{ loan_type.name }}
      </router-link>
    </div>
    <div class="router-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  //   import CalcTabLayout from "@/components/CalcTabLayout";
  import store from "@/store"; // import the store
  import { mapState } from "vuex";
  export default {
    name: "CalculateView",
    computed: {
      ...mapState({
        loan_types: (state) => state.loan_type.loan_type,
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
      console.log(this.loan_types);
    },
    methods: {
      goToloan_type(slug) {
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

<style>
  .container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }

  .tabs {
    display: flex;
    flex-direction: row;
    height: 50px;
    background-color: #f5f5f5;
  }

  .tabs a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    color: #000000;
    text-decoration: none;
    font-weight: bold;
  }

  .tabs a:hover {
    background-color: #ddd;
  }

  .active-tab {
    background-color: #4caf50;
    color: #ffffff;
  }

  @media (max-width: 768px) {
    .tabs {
      flex-direction: column;
      height: auto;
      width: 100%;
    }

    .tabs a {
      width: 100%;
      height: 50px;
      margin-bottom: 5px;
    }
  }
</style>
