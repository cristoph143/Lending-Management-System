<template>
  <div class="container" v-if="$route.params.slug">
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
  <div class="container" v-else>
    <div class="default-container" :class="{ centered: !$route.params.slug }">
      <div v-if="!$route.params.slug" class="no-route">
        <div class="image-section">
          <img src="../../assets/images/Tax-Accountant.png" alt="Calculator" />
          <h2>Calculate Loan</h2>
          <button class="accent-btn" @click="openTabs">
            Calculate and Apply Now
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  //   import CalcTabLayout from "@/components/CalcTabLayout";
  import store from "@/store"; // import the store
  import { mapState } from "vuex";
  export default {
    name: "CalculateView",
    data() {
      return {
        showTabs: false,
      };
    },
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
      openTabs() {
        this.showTabs = true;
        this.goToloan_type(this.loan_types[0].slug);
      },
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

  .no-route {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .no-route h2 {
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  .no-route img {
    max-width: 50%;
    margin-bottom: 2rem;
  }

  .accent-btn {
    background-color: #4caf50;
    color: #ffffff;
    padding: 1rem 2rem;
    border: none;
    border-radius: 4px;
    font-weight: bold;
    cursor: pointer;
  }

  .accent-btn:hover {
    background-color: #2e8b57;
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

  .image-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
  }

  .image-container img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }

  h2 {
    margin: 20px 0;
    font-size: 24px;
    font-weight: bold;
    text-align: center;
  }
</style>