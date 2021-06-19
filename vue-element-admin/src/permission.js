import router from './router'
import store from './store'
import {
  Message
} from 'element-ui'
import NProgress from 'nprogress' // 顶部浏览器进度条
import 'nprogress/nprogress.css' // 顶部浏览器进度条 style
import {
  getToken
} from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({
  showSpinner: false
}) // NProgress Configuration 顶部浏览器进度条

// 路由白名单
const whiteList = ['/login', '/auth-redirect']

// 路由拦截器
router.beforeEach(async(to, from, next) => {
  // 顶部浏览器进度条 start
  NProgress.start()

  // set page title 设置页面标题
  document.title = getPageTitle(to.meta.title)

  // 获取本地登录令牌，true表示登陆过，false表示没有登陆过
  const hasToken = getToken()

  if (hasToken) {
    // 登陆过
    console.log('登陆过')
    if (to.path === '/login') {
      // 如果登陆过，并且目标是 login，则路由到首页
      next({
        path: '/'
      })
      // 顶部浏览器进度条 done
      NProgress.done()
    } else {
      // 获取登录用户的角色信息，如果没有则通过 getInfo 获取当前登录用户的角色信息
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          // 获取登录用户的角色信息
          const {
            roles
          } = await store.dispatch('user/getInfo')

          // 根据角色信息，请求获取路由表，生成动态路由
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

          // 添加动态路由
          router.addRoutes(accessRoutes)

          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({
            ...to,
            replace: true
          })
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    //  没有登陆过
    console.log('没有登陆过')
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
