import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/login'
  }, {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue')
  },
  // 所有的路由页面都是嵌套显示在main页面组件中的
  {
    path: '/main',
    name: 'main',
    redirect: '/index',
    component: () => import('../views/main.vue'),
    children: [{
        path: '/index',
        name: '首页',
        meta: {
          title: '首页'
        },
        component: () => import('../components/index/index.vue'),
      },
      {
        path: '/users',
        name: '用户列表',
        meta: {
          title: '用户列表'
        },
        component: () => import('../components/user/users.vue'),
      },
      {
        path: '/power',
        name: '权限列表',
        meta: {
          title: '权限列表'
        },
        component: () => import('../components/power/power.vue'),
      },
      {
        path: '/roles',
        name: '角色列表',
        meta: {
          title: '角色列表'
        },
        component: () => import('../components/power/roles.vue'),
      },
      {
        path: '/goods',
        name: '商品列表',
        meta: {
          title: '商品列表'
        },
        component: () => import('../components/goods/goods.vue'),
      },
      {
        path: '/class',
        name: '分类参数',
        meta: {
          title: '分类参数'
        },
        component: () => import('../components/goods/class.vue'),
      },
      {
        path: '/goodClass',
        name: '商品分类',
        meta: {
          title: '商品分类'
        },
        component: () => import('../components/goods/goodClass.vue'),
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 判断是否有 token 没有的话跳转login
router.beforeEach((to, from, next) => {
  const token = window.sessionStorage.getItem('token');

  if (token) {
    // 登陆过
    if (to.path === '/login') {
      next('/main')
    } else {
      next()
    }
  } else {
    // 没登录过
    if (to.path !== '/login') return next('/login')
    next()
  }

})

export default router