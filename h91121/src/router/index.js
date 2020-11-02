import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: '/',
        redirect: '/login' // 默认显示的页面
    },
    {
        path: '/login',
        name: 'login',
        meta: {
            slide: 0
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/login.vue')
    },
    {
        path: '/start',
        name: 'start',
        meta: {
            slide: 0
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/start.vue'),
        children: [
            {
                path: '/summay',
                name: 'summay',
                component: () => import(/* webpackChunkName: "about" */ '../components/main/summay/summayComponent.vue'),
            },
            {
                path: '/review',
                name: 'review',
                component: () => import(/* webpackChunkName: "about" */ '../components/main/review/reviewComponent.vue'),
            },
            {
                path: '/operating',
                name: 'operating',
                component: () => import(/* webpackChunkName: "about" */ '../components/main/operating/operatingComponent.vue'),
            }
        ],
        redirect: '/summay'
    }
];

const router = new VueRouter({
    // mode: 'history',
    mode: "hash",
    routes
});

export default router

/**
 * 解决路由报错
 * */
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
};
