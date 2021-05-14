import {
  createRouter,
  createWebHashHistory
} from 'vue-router';

const routes = [{
    path: '/',
    name: 'Home',
    meta: {
      login: true
    },
    component: () => import('../views/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    meta: {
      login: false
    },
    component: () => import('../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from) => {
  console.log('我要去 = ' + to.name);
  console.log('我来自 = ' + from.name);

  if (from.meta.login) {
    window.alert('无法进入')
    return false
  }

})

export default router