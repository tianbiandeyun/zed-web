import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/home.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/login.vue')
    },
    {
        path: '/info',
        name: 'Info',
        component: () => import('../views/info.vue')
    }
];

const router = new VueRouter({
    // mode: 'history',
    routes
});

export default router
