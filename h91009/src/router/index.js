import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: '/',
    redirect: '/start' // 默认显示的页面
  },
  {
    path: '/start',
    name: 'start',
    meta: {
      slide: 0
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/start.vue')
  }
];

const router = new VueRouter({
  // mode: 'history',
  mode: "hash",
  routes
});

export default router
