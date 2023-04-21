import {
    createRouter,
    createWebHistory
} from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [{
    path: "/",
    name: "home",
    component: HomeView,
}, {
    path: "/about",
    name: "about",
    component: () =>
        import( /* webpackChunkName: "about" */ "../views/AboutView.vue"),
}, {
    path: "/diminishing-interest",
    name: "diminishing",
    component: () =>
        import(
            /* webpackChunkName: "diminishing" */
            "../views/diminishingInterest.vue"
        ),
}, {
    path: "/fixed-interest",
    name: "fixed",
    component: () =>
        import( /* webpackChunkName: "fixed" */ "../views/FixedInterest.vue"),
}, {
    path: "/lump-sum",
    name: "lumpsum",
    component: () =>
        import( /* webpackChunkName: "lumpsum" */ "../views/LumpSum.vue"),
}, {
    path: "/calculate",
    name: "calculate-dashboard",
    component: () =>
        import( /* webpackChunkName: "calculate-dashboard" */ "../views/Calculate/Calculate-Dashboard.vue"),
    children: [{
        path: ":slug",
        name: "calculate-view",
        component: () =>
            import( /* webpackChunkName: "calculate-view" */ "../views/Calculate/Calculate-View.vue"),
        props: true,
    },],
}, {
    path: "/calculate/:slug",
    name: "calculate_page",
    component: () =>
        import( /* webpackChunkName: "calculate_page" */ "../views/TheCalcValue.vue"),
}, {
    path: "/penalty-calculator",
    name: "penalty",
    component: () =>
        import(
            /* webpackChunkName: "penalty" */
            "../views/PenaltyCalculator.vue"
        ),
}, {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () =>
        import( /* webpackChunkName: "not-found" */ '../views/NotFoundView.vue'),
},];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;