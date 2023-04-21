<template>
  <div class="container">
    <div class="tabs">
      <router-link
        v-for="destination in destinations"
        :key="destination.slug"
        :to="{ name: 'calculate-view', params: { slug: destination.slug } }"
        :class="{ 'active-tab': currentSlug === destination.slug }"
      >
        {{ destination.name }}
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
        destinations: (state) => state.destination.destinations,
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
      console.log(this.destinations);
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

<style>
  .container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    align-items: center;
    margin-top: 50px;
  }

  .tabs {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 50px;
    background-color: #f5f5f5;
    justify-content: space-between;
    align-items: center;
  }

  .tabs a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 120px;
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

  .router-container {
    flex: 1;
    height: 100%;
    overflow: auto;
  }

  @media (max-width: 768px) {
    .tabs {
      flex-direction: column;
      height: auto;
    }

    .tabs a {
      width: 100%;
      height: 50px;
      margin-bottom: 5px;
    }
  }
</style>
