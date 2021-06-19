import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* 路由主模板 */
import Layout from '@/layout'
/**
 * hidden: true                   设置菜单是否隐藏（不显示在左边菜单，缺省 false）
 * alwaysShow: true               设置在一级菜单上，是否总是显示，true 表示总是显示
 *                                如果为 false，一级菜单只会在有多个子菜单情况下才显示
 *
 * redirect: noRedirect           如果设置成noRedirect面包屑不会重定向
 * name:'router-name'             路由名称，必须设置，并且唯一
 * meta : {
    roles: ['admin','editor']     角色权限，允许使用这些路由的角色列表
    title: 'title'                显示在左边导航栏和面包屑上的名称
    icon: 'svg-name'/'el-icon-x'  图标名称
    noCache: true                 页面是否不要缓存，缺省为 false
    affix: true                   标签页面是否总是显示（不能关闭）
    breadcrumb: false             缺省 true，是否以面包屑显示页面
    activeMenu: '/example/list'   在左边菜单上高亮显示
  }
 */

/**
 * 基础路由表，所有用户都可以访问的路由表
 */
export const constantRoutes = [{
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [{
      path: '/redirect/:path(.*)',
      component: () => import('@/views/redirect/index')
    }]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      name: 'Dashboard',
      meta: {
        title: '首页',
        icon: 'dashboard',
        affix: true
      }
    }]
  },
  {
    path: '/documentation',
    component: Layout,
    redirect: '/documentation/index',
    children: [{
      path: 'index',
      component: () => import('@/views/documentation/index'),
      name: 'Documentation',
      meta: {
        title: '第二页',
        icon: 'documentation',
        affix: false
      }
    }]
  },
  {
    path: '/guide',
    component: Layout,
    redirect: '/guide/index',
    children: [{
      path: 'index',
      component: () => import('@/views/guide/index'),
      name: 'Guide',
      meta: {
        title: '第三页',
        icon: 'guide',
        noCache: true
      }
    }]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    children: [{
      path: 'index',
      component: () => import('@/views/profile/index'),
      name: 'Profile',
      meta: {
        title: '第四页',
        icon: 'user',
        noCache: true
      }
    }]
  }
]

/**
 * 异步路由，只有拥有权限的用户，才能显示的路由表
 */
export const asyncRoutes = [{
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    meta: {
      title: '第五页',
      icon: 'lock',
      roles: ['admin'] // you can set roles in root nav
    },
    children: [{
        path: 'page',
        component: () => import('@/views/permission/page'),
        name: 'PagePermission',
        meta: {
          title: '第五页 - 1',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive'),
        name: 'DirectivePermission',
        meta: {
          title: '第五页 - 2',
          roles: ['admin']
        }
      },
      {
        path: 'role',
        component: () => import('@/views/permission/role'),
        name: 'RolePermission',
        meta: {
          title: '第五页 - 3',
          roles: ['admin']
        }
      }
    ]
  },
  {
    path: '/error',
    component: Layout,
    redirect: 'noRedirect',
    name: 'ErrorPages',
    meta: {
      title: '错误页面展示',
      icon: '404'
    },
    children: [{
        path: '401',
        component: () => import('@/views/error-page/401'),
        name: 'Page401',
        meta: {
          title: '401',
          noCache: true
        }
      },
      {
        path: '404',
        component: () => import('@/views/error-page/404'),
        name: 'Page404',
        meta: {
          title: '404',
          noCache: true
        }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// 初始化路由信息，重置路由
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
