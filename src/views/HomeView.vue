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
        destinations: (state) => state.state.destinations,
      }),
    },
    mounted() {
      console.log(this.destinations);
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
