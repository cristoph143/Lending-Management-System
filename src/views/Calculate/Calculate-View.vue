<template>
  <div class="calculate-view-container">
    <div class="upper">
      <h1>Calculate View for {{ $route.params.slug }}</h1>
    </div>
    <div class="lower">
      <div class="left">
        <LoanCalculatorVue />
      </div>
      <div class="right">
        <DisplayCalcResult />
      </div>
    </div>
  </div>
</template>

<script>
  import store from "@/store";
  import { mapState } from "vuex";
  import LoanCalculatorVue from "@/components/Common/LoanCalculator.vue";
  import DisplayCalcResult from "@/components/Common/DisplayCalcResult.vue";

  export default {
    name: "CalculateView",
    computed: {
      ...mapState({
        loan_type: (state) => state.loan_type.loan_type,
      }),
    },
    created() {
      this.$store = store;
      console.log(this.loan_type);
    },
    components: {
      LoanCalculatorVue,
      DisplayCalcResult
    },
  };
</script>

<style scoped>
.calculate-view-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.upper {
  height: 20%;
  background-color: lightblue;
  display: flex;
  justify-content: center;
  align-items: center;
}

.lower {
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.left {
  background-color: lightgray;
  padding: 50px 20px;
}

.right {
  background-color: lightgray;
  padding: 50px 20px;
}

@media screen and (min-width: 768px) {
  .lower {
    flex-direction: row;
    height: 100%;
  }

  .left {
    width: 40%;
  }

  .right {
    width: 60%;
  }
}
@media screen and (max-width: 768px) {
  .calculate-view-container {
    width: 100%;
  }

  .left, .right {
    width: 90%;
    padding: 30px 20px;
  }
}
</style>
