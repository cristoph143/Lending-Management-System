<template>
  <div class="main_box">
    <div
      v-for="destination in destinations"
      :key="destination.slug"
      class="box scrollables"
    >
      <h1>{{ destination.name }}</h1>
      <!-- go to button with icon and router -->
      <!-- <router-link
        :to="getLink(destination)"
        @click="callTheCalcValue(destination)"
      > -->
        <!-- <button class="goToButton btn">
          <i class="fas fa-arrow-right">Calculate Now</i>
        </button>
      </router-link> -->
      <router-link :to="{ name: 'Calculate', params: { slug: destination.slug } }">
  <button class="goToButton btn">
    <i class="fas fa-arrow-right">Calculate Now</i>
  </button>
</router-link>
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
    },
    created() {
      this.$store = store;
      console.log(this.destinations);
    },
    methods: {
      getLink(destination) {
        console.log(destination);
        if (
          ["diminishing-interest", "fixed-interest", "lump-sum"].includes(
            destination.slug
          )
        ) {
          return "/calculate/`{}`";
        } else if (destination.slug === "penalty-calculator") {
          return "/penalty-calculator";
        } else {
          // handle other cases as needed
          return "/";
        }
      },
      callTheCalcValue(destination) {
        if (
          ["diminishing-interest", "fixed-interest", "lump-sum"].includes(
            destination.slug
          )
        ) {
          this.$emit("destination-selected", destination.slug);
        } else if (destination.slug === "penalty-calculator") {
          this.$emit("destination-selected", destination.slug);
        }
      },
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
    display: flex;
    margin: 20px;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }

  .main_box {
    display: flex;
  }

  .btn {
    background-color: #4caf50;
    /* Green */
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
