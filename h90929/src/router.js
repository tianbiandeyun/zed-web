import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
  // mode: 'history',
  mode: "hash",
  routes: [
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
      component: () => import(/* webpackChunkName: "about" */ './views/start.vue')
    },
    {
      path: '/question',
      name: 'question',
      meta: {
        slide: 1
      },
      component: () => import(/* webpackChunkName: "about" */ './views/question.vue')
    },
    {
      path: '/result',
      name: 'result',
      meta: {
        slide: 1
      },
      component: () => import(/* webpackChunkName: "about" */ './views/result.vue')
    }
  ]
})
