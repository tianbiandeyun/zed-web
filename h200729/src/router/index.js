import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Index',
        component: () => import('../views/index.vue')
    },
    {
        path: '/play',
        name: 'Play',
        component: () => import('../views/play.vue')
    },
    {
        path: '/search',
        name: 'Search',
        component: () => import('../views/search.vue')
    }
];

const router = new VueRouter({
    routes
});

export default router
