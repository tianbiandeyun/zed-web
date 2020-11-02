import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Login',
        component: () => import('../views/login.vue')
    },
    {
        path: '/summay',
        name: 'Summay',
        components: {
            // header 和 footer 固定的和头尾
            default: () => import('../views/summay.vue'),
            header: () => import('../components/header/header.vue'),
            footer: () => import('../components/footer/footer.vue')
        }
    }
];

const router = new VueRouter({
    mode: 'hash',
    routes
});

export default router
