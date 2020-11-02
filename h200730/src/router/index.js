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
        path: '/sendOffice',
        name: 'SendOffice',
        component: () => import('../views/sendOffice.vue')
    },
    {
        path: '/basic',
        name: 'Basic',
        component: () => import('../views/basic.vue')
    },
    {
        path: '/uploader',
        name: 'Uploader',
        component: () => import('../views/uploader.vue')
    },
    {
        path: '/resume',
        name: 'Resume',
        component: () => import('../views/resume.vue')
    },
    {
        path: '/officeDetails',
        name: 'OfficeDetails',
        component: () => import('../views/officeDetails.vue')
    }
];

const router = new VueRouter({
    routes
});

export default router
