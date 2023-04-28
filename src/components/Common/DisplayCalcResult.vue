<template>
        {{this.$route.params.slug}}
</template>

<script>
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
