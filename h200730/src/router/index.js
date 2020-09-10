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
        path: '/ageSchool',
        name: 'AgeSchool',
        component: () => import('../views/ageSchool.vue')
    },
    {
        path: '/office',
        name: 'Office',
        component: () => import('../views/office.vue')
    },
    {
        path: '/experience',
        name: 'Experience',
        component: () => import('../views/experience.vue')
    },
    {
        path: '/resume',
        name: 'Resume',
        component: () => import('../views/resume.vue')
    }
];

const router = new VueRouter({
    routes
});

export default router
