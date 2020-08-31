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
        path: '/reward',
        name: 'Reward',
        component: () => import('../views/reward.vue')
    },
    {
        path: '/sign',
        name: 'Sign',
        component: () => import('../views/sign.vue')
    },
    {
        path: '/getReward',
        name: 'GetReward',
        component: () => import('../views/getReward.vue')
    },
    {
        path: '/rule',
        name: 'Rule',
        component: () => import('../views/rule.vue')
    }
];

const router = new VueRouter({
    routes
});

export default router
