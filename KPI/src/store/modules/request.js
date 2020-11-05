import unit from "../../utils/unit";
import mutations from "./mutations";
import Fly from "flyio/dist/npm/wx";

const fly = new Fly;

export default {
  state: {
    registUser: "", // 注册用户
    setUserInfo: "", // 设置用户信息
    addTask: "", // 新建任务
    addTaskMember: "",// 添加 执行人-审查人
    getAddress: "", // 获取通讯录参数单选
    getAddressMulti: "", // 获取通讯录参数多选
    getTaskList: "", // 获得任务列表
    getTaskDetalis: "", // 获取任务详情
    getTaskReviewList: "", // 获取任务审核详情
    getTaskHolders: "", // 获取执行人 / 审查人
    getDisagree: "", // 获取拒绝原因
    setTask: "", // 对任务作出决定
    getReviewResultTime: "", // 获取我审查的时间点
    getReviewUserList: "", // 获取被审查人列表
    setReviewTask: "", // 审查任务
    getAnalysisList: "", // 获取统计管理人员统计
    getStaffChart: "", // 员工统计详细信息
    getEveryMonthDetails: "", // 每个月的详情
    getHasNotice: "", // 获取首页6个操作栏是否有新消息
    getNotice: "", // 获取各种消息
    addGLobalMember: "", // 添加管理员
    delGlobalMember: "", // 删除管理员
    getGlobalMember: "", // 获取管理员
    setFeedback: "", // 设置反馈
    modifyTask: "",// 修改任务
    getUserInfo: "", // 获取系统帮助权限
    getAdministrators: "", // 获取系统帮助管理员列表
    getVideoInfo: "", // 获取系统帮助视频
    setSystemNotice: "", // 设置消息
    withdrawReview: ""// 撤回审查任务
  },
  actions: {
    /**
     * 获取时间
     * */
    _getTime({ commit }, params) {
      const [im, fps, url] = [params.im, params.fps, params.url];
      const requestUrl = unit.produceRequestUrl(im, fps, url);
      return new Promise((resolve, reject) => {
        fly.get(requestUrl).then(res => {
          resolve(res);
        });
      });
    },
    /**
     * 撤回审查任务
     * */
    _withdrawReview({ commit }, params) {
      const [im, fps, url] = [params.im, params.fps, params.url];
      const requestUrl = unit.produceRequestUrl(im, fps, url);
      return new Promise((resolve, reject) => {
        fly.get(requestUrl).then(res => {
          resolve(res);
        });
      });
    },
    /**
     * 设置消息
     * */
    _setSystemNotice({ commit }, params) {
      const [im, fps, url] = [params.im, params.fps, params.url];
      const requestUrl = unit.produceRequestUrl(im, fps, url);
      return new Promise((resolve, reject) => {
        fly.get(requestUrl).then(res => {
          resolve(res);
        });
      });
    },
    /**
     * 获取系统帮助视频
     * */
    _getVideoInfo({ commit }, params) {
      const [im, fps, url] = [params.im, params.fps, params.url];
      const requestUrl = unit.produceRequestUrl(im, fps, url);
      return new Promise((resolve, reject) => {
        fly.get(requestUrl).then(res => {
          commit("GETVIDEOINFO", res);
          resolve(res);
        });
      });
    },
    /**
     * 获取系统帮助管理员列表
     * */
    _getAdministrators({ commit }, params) {
      const [im, fps, url] = [params.im, params.fps, params.url];
      const requestUrl = unit.produceRequestUrl(im, fps, url);
      return new Promise((resolve, reject) => {
        fly.get(requestUrl).then(res => {
          resolve(res);
        });
      });
    },
    /**
     * 获取系统帮助权限
     * */
    _getUserInfo({ commit }, params) {
      const [im, fps, url] = [params.im, params.fps, params.url];
      const requestUrl = unit.produceRequestUrl(im, fps, url);
      return new Promise((resolve, reject) => {
        fly.get(requestUrl).then(res => {
          resolve(res);
        });
      });
    },
    /**
     * 修改任务
     * */
    _modifyTask({ commit }, params) {
      const [im, fps, url] = [params.im, params.fps, params.url];
      const requestUrl = unit.produceRequestUrl(im, fps, url);
      return new Promise((resolve, reject) => {
        fly.get(requestUrl).then(res => {
          resolve(res);
        });
      });
    },
    /**
     * 设置反馈
     * */
    _setFeedback({ commit }, params) {
      const [im, fps, url] = [params.im, params.fps, params.url];
      const requestUrl = unit.produceRequestUrl(im, fps, url);
      return new Promise((resolve, reject) => {
        fly.get(requestUrl).then(res => {
          resolve(res);
        });
      });
    },
    /**
     * 获取管理员
     * */
    _getGlobalMember({ commit }, params) {
      const [im, fps, url] = [params.im, params.fps, params.url];
      const requestUrl = unit.produceRequestUrl(im, fps, url);
      return new Promise((resolve, reject) => {
        fly.get(requestUrl).then(res => {
          resolve(res);
        });
      });
    },
    /**
     * 删除管理员
     * */
    _delGlobalMember({ commit }, params) {
      const [im, fps, url] = [params.im, params.fps, params.url];
      const requestUrl = unit.produceRequestUrl(im, fps, url);
      return new Promise((resolve, reject) => {
        fly.get(requestUrl).then(res => {
          resolve(res);
        });
      });
    },
    /**
     * 添加管理员
     * */
    _addGLobalMember({ commit }, params) {
      const [im, fps, url] = [params.im, params.fps, params.url];
      const requestUrl = unit.produceRequestUrl(im, fps, url);
      return new Promise((resolve, reject) => {
        fly.get(requestUrl).then(res => {
          resolve(res);
        });
      });
    },
    /**
     * 获取各种消息
     * */
    _getNotice({ commit }, params) {
      const [im, fps, url] = [params.im, params.fps, params.url];
      const requestUrl = unit.produceRequestUrl(im, fps, url);
      return new Promise((resolve, reject) => {
        fly.get(requestUrl).then(res => {
          resolve(res);
        });
      });
    },
    /**
     * 获取首页6个操作栏是否有新消息
     * */
    _getHasNotice({ commit }, params) {
      const [im, fps, url] = [params.im, params.fps, params.url];
      const requestUrl = unit.produceRequestUrl(im, fps, url);
      return new Promise((resolve, reject) => {
        fly.get(requestUrl).then(res => {
          resolve(res);
        });
      });
    },
    /**
     * 每个月的详情
     * */
    _getEveryMonthDetails({ commit }, params) {
      const [im, fps, url] = [params.im, params.fps, params.url];
      const requestUrl = unit.produceRequestUrl(im, fps, url);
      return new Promise((resolve, reject) => {
        fly.get(requestUrl).then(res => {
          resolve(res);
        });
      });
    },
    /**
     * 员工统计详细信息
     * */
    _getStaffChart({ commit }, params) {
      const [im, fps, url] = [params.im, params.fps, params.url];
      const requestUrl = unit.produceRequestUrl(im, fps, url);
      return new Promise((resolve, reject) => {
        fly.get(requestUrl).then(res => {
          resolve(res);
        });
      });
    },
    /**
     * 获取统计管理人员统计
     * */
    _getAnalysisList({ commit }, params) {
      const [im, fps, url] = [params.im, params.fps, params.url];
      const requestUrl = unit.produceRequestUrl(im, fps, url);
      return new Promise((resolve, reject) => {
        fly.get(requestUrl).then(res => {
          resolve(res);
        });
      });
    },
    /**
     * 审查任务
     * */
    _setReviewTask({ commit }, params) {
      const [im, fps, url] = [params.im, params.fps, params.url];
      const requestUrl = unit.produceRequestUrl(im, fps, url);
      return new Promise((resolve, reject) => {
        fly.get(requestUrl).then(res => {
          resolve(res);
        });
      });
    },
    /**
     * 获取被审查人列表
     * */
    _getReviewUserList({ commit }, params) {
      const [im, fps, url] = [params.im, params.fps, params.url];
      const requestUrl = unit.produceRequestUrl(im, fps, url);
      return new Promise((resolve, reject) => {
        fly.get(requestUrl).then(res => {
          resolve(res);
        });
      });
    },
    /**
     * 获取我审查的时间点
     * */
    _getReviewResultTime({ commit }, params) {
      const [im, fps, url] = [params.im, params.fps, params.url];
      const requestUrl = unit.produceRequestUrl(im, fps, url);
      return new Promise((resolve, reject) => {
        fly.get(requestUrl).then(res => {
          resolve(res);
        });
      });
    },
    /**
     * 对任务作出决定
     * */
    _setTask({ commit }, params) {
      const [im, fps, url] = [params.im, params.fps, params.url];
      const requestUrl = unit.produceRequestUrl(im, fps, url);
      return new Promise((resolve, reject) => {
        fly.get(requestUrl).then(res => {
          resolve(res);
        });
      });
    },
    /**
     * 获取拒绝原因
     * */
    _getDisagree({ commit }, params) {
      const [im, fps, url] = [params.im, params.fps, params.url];
      const requestUrl = unit.produceRequestUrl(im, fps, url);
      return new Promise((resolve, reject) => {
        fly.get(requestUrl).then(res => {
          resolve(res);
        });
      });
    },
    /**
     * 获取执行人 / 审查人
     * */
    _getTaskHolders({ commit }, params) {
      const [im, fps, url] = [params.im, params.fps, params.url];
      const requestUrl = unit.produceRequestUrl(im, fps, url);
      return new Promise((resolve, reject) => {
        fly.get(requestUrl).then(res => {
          resolve(res);
        });
      });
    },
    /**
     * 获取任务审核详情
     * */
    _getTaskReviewList({ commit }, params) {
      const [im, fps, url] = [params.im, params.fps, params.url];
      const requestUrl = unit.produceRequestUrl(im, fps, url);
      return new Promise((resolve, reject) => {
        fly.get(requestUrl).then(res => {
          resolve(res);
        });
      });
    },
    /**
     * 获取任务详情
     * */
    _getTaskDetalis({ commit }, params) {
      const [im, fps, url] = [params.im, params.fps, params.url];
      const requestUrl = unit.produceRequestUrl(im, fps, url);
      return new Promise((resolve, reject) => {
        fly.get(requestUrl).then(res => {
          resolve(res);
        });
      });
    },
    /**
     * 获得任务列表
     * */
    _getTaskList({ commit }, params) {
      const [im, fps, url] = [params.im, params.fps, params.url];
      const requestUrl = unit.produceRequestUrl(im, fps, url);
      return new Promise((resolve, reject) => {
        fly.get(requestUrl).then(res => {
          resolve(res);
        });
      });
    },
    /**
     * 获取通讯录参数多选
     * */
    _getAddressMulti({ commit }, params) {
      const [im, fps, url] = [params.im, params.fps, params.url];
      const requestUrl = unit.produceRequestUrl(im, fps, url);
      return new Promise((resolve, reject) => {
        fly.get(requestUrl).then(res => {
          commit("GETADDRESSMULTI", res);
          resolve(res);
        });
      });
    },
    /**
     * 获取通讯录参数单选
     * */
    _getAddress({ commit }, params) {
      const [im, fps, url] = [params.im, params.fps, params.url];
      const requestUrl = unit.produceRequestUrl(im, fps, url);
      return new Promise((resolve, reject) => {
        fly.get(requestUrl).then(res => {
          commit("GETADDRESS", res);
          resolve(res);
        });
      });
    },
    /**
     * 新建任务执行人-审查人
     * */
    _addTaskMember({ commit }, params) {
      const [im, fps, url] = [params.im, params.fps, params.url];
      const requestUrl = unit.produceRequestUrl(im, fps, url);
      return new Promise((resolve, reject) => {
        fly.get(requestUrl).then(res => {
          resolve(res);
        });
      });
    },
    /**
     * 新建任务
     * */
    _addTask({ commit }, params) {
      const [im, fps, url] = [params.im, params.fps, params.url];
      const requestUrl = unit.produceRequestUrl(im, fps, url);
      return new Promise((resolve, reject) => {
        fly.get(requestUrl).then(res => {
          resolve(res);
        });
      });
    },
    /**
     * 设置用户信息
     * */
    _setUserInfo({ commit }, params) {
      const [im, fps, url] = [params.im, params.fps, params.url];
      const requestUrl = unit.produceRequestUrl(im, fps, url);
      return new Promise((resolve, reject) => {
        fly.get(requestUrl).then(res => {
          resolve(res);
        });
      });
    },
    /**
     * 注册用户
     * */
    _registUser({ commit }, params) {
      const [im, fps, url] = [params.im, params.fps, params.url];
      const requestUrl = unit.produceRequestUrl(im, fps, url);
      return new Promise((resolve, reject) => {
        fly.get(requestUrl).then(res => {
          commit("REGISTUSER", res);
          resolve(res);
        });
      });
    }
  },
  mutations
};
