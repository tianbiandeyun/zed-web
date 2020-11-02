import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: '/',
        redirect: '/home' // 默认显示的页面
    },
    {
        path: '/home',
        name: 'home',
        meta: {
            slide: 0
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/home.vue')
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
