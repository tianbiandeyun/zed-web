import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    menu: [{
        id: "145",
        path: "/index",
        authName: "首页"
      },
      {
        id: "125",
        authName: "用户管理",
        children: [{
          id: "1251",
          path: "/users",
          authName: "用户列表"
        }],
      },
      {
        id: "103",
        authName: "权限管理",
        children: [{
            id: "1031",
            path: "/roles",
            authName: "角色列表"
          },
          {
            id: "1032",
            path: "/power",
            authName: "权限列表"
          },
        ],
      },
      {
        id: "101",
        authName: "商品管理",
        children: [{
            id: "1011",
            path: "/goods",
            authName: "商品列表"
          },
          {
            id: "1012",
            path: "/class",
            authName: "分类参数"
          },
          {
            id: "1013",
            path: "/goodClass",
            authName: "商品分类"
          },
        ],
      }
    ],
    table: [{
        id: 11,
        username: "tige_11",
        mobile: 17344421920,
        type: 1,
        email: "11@qq.com",
        create_tiem: "2021-06-01",
        user_state: true,
        role: "超级管理员",
      },
      {
        id: 12,
        username: "tige_12",
        mobile: 17344421920,
        type: 1,
        email: "12@qq.com",
        create_tiem: "2021-06-01",
        user_state: true,
        role: "超级管理员",
      },
      {
        id: 13,
        username: "tige_13",
        mobile: "无",
        type: 2,
        email: "13@qq.com",
        create_tiem: "2021-06-01",
        user_state: true,
        role: "普通用户",
      },
      {
        id: 14,
        username: "tige_14",
        mobile: 17344421920,
        type: 2,
        email: "14@qq.com",
        create_tiem: "2021-06-01",
        user_state: true,
        role: "普通用户",
      },
    ],
  },
  mutations: {},
  actions: {},
  modules: {},
  getters: {
    menu: state => state.menu,
    table: state => state.table,
  }
})