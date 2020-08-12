import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue')
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
    },
    {
        path: '/test',
        name: 'Test',
        component: () => import('../views/test.vue')
    },
    {
        path: '/rules',
        name: 'Rules',
        component: () => import('../views/rules.vue')
    },
    {
        path: '/question',
        name: 'Question',
        component: () => import('../views/question.vue')
    },
    {
        path: '/result',
        name: 'Result',
        component: () => import('../views/result.vue')
    }
];

const router = new VueRouter({
    mode: 'history',
    routes
});

export default router
