<template>
  <div class="home">
    <h1>Loan Calculator</h1>
    <!-- create 4 boxes for each category -->
    <div
      v-for="destination in destinations"
      :key="destination.slug"
      class="box scrollables"
    >
      <h1>{{ destination.name }}</h1>
      <!-- go to button with icon and router -->
      <router-link :to="`/${destination.slug}`">
        <button class="goToButton btn">
          <i class="fas fa-arrow-right">Calculate Now</i>
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
  import { mapState } from "vuex";

  export default {
    computed: {
      ...mapState({
        destinations: (state) => state.destination.destinations,
      }),
    },
    mounted() {
      console.log(this.destinations);
    },
  };
</script>
