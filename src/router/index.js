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