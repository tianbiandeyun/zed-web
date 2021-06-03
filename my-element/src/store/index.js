import Vue from 'vue'
import Vuex from 'vuex'
import Mock from "mockjs";

let mockDate = Mock.mock({
  "table|1-10": [{
    "id|+1": 1,
    username: "@cname",
    mobile: /^1[0-9]{10}$/,
    "type|1-2": 1,
    'email': '@email()',
    'create_time': '@date("yyyy-MM-dd")',
    "user_state|1": true,
    'role': function () {
      return this.user_state ? '超级管理员' : '普通用户'
    }
  }],
});

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
    table: mockDate,
  },
  mutations: {},
  actions: {},
  modules: {},
  getters: {
    menu: state => state.menu,
    table: state => state.table,
  }
})