<template>
  <div class="container">
    <md-tabs
      md-dynamic-height
      md-alignment="fixed"
      v-model="activeTab"
      @md-changed="handleTabChange"
    >
      <md-tab v-for="(tab, index) in tabs" :key="index" :md-label="tab.label">{{
        tab.content
      }}</md-tab>
    </md-tabs>
  </div>
  <div class="body" v-if="activeTab === 'page0'">
    <CalcLayout type="type" />
  </div>
  <div class="body" v-if="activeTab === 'page1'">
    <CalcLayout type="type" />
  </div>
  <div class="body" v-if="activeTab === 'page2'">
    <CalcLayout type="type" />
  </div>
  <div class="body" v-if="activeTab === 'page3'">
    <PenaltyLayout type="type" />
  </div>
</template>

<script>
  // eslint-disable-next-line vue/no-unused-components
  import CalcLayout from "./Calc-Layout.vue";
  import PenaltyLayout from "./Penalty-Layout.vue";
  //   import VueMaterial from "vue-material";
  import "vue-material/dist/vue-material.min.css";
  import "vue-material/dist/theme/default.css";

  export default {
    components: {
      CalcLayout,
      PenaltyLayout,
      //   VueMaterial,
    },
    data() {
      return {
        activeTab: "page0",
        type: "",
        tabs: [
          { name: "page0", label: "Diminishing Interest" },
          { name: "page1", label: "Fixed Interest" },
          { name: "page2", label: "Lump Sum" },
          { name: "page3", label: "Penalty Calculator" },
        ],
      };
    },
    methods: {
      changeTab(tab) {
        this.activeTab = tab;
      },
      handleTabChange(tabName) {
        this.activeTab = tabName;
        if (this.activeTab === "page0") {
          this.type = "diminishingInterest";
        } else if (this.activeTab === "page1") {
          this.type = "fixedInterest";
        } else if (this.activeTab === "page2") {
          this.type = "lumpsum";
        } else if (this.activeTab === "page3") {
          this.type = "penaltyCalculator";
        }
        console.log(this.activeTab);
      },
    },
  };
</script>

<style src="../assets/css/calculator_tabs.css" scoped></style>
