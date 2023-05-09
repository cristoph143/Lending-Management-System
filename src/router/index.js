import {
    createRouter,
    createWebHistory
} from "vue-router";
import HomeView from "../views/Common/HomeView.vue";

const routes = [{
    path: "/",
    name: "home",
    component: HomeView,
}, {
    path: "/about",
    name: "about",
    component: () =>
        import ( /* webpackChunkName: "about" */ "../views/Common/AboutView.vue"),
}, {
    path: "/calculate",
    name: "calculate-dashboard",
    component: () =>
        import ( /* webpackChunkName: "calculate-dashboard" */ "../views/Common/Calculate/Calculate-Dashboard.vue"),
    children: [{
        path: ":slug",
        name: "calculate-view",
        component: () =>
            import ( /* webpackChunkName: "calculate-view" */ "../views/Common/Calculate/Calculate-View.vue"),
        props: true,
    }, ],
}, {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () =>
        import ( /* webpackChunkName: "not-found" */ '../views/Common/NotFoundView.vue'),
}, ];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;