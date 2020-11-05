/**
 * 考核表状态
 * */
const PEOJECT_STATE = {
  "2": "../../static/images/waiting.png", // 黄色 待确认
  "3": "../../static/images/doing.png", // 蓝色 执行中
  "4": "../../static/images/success.png", // 绿色 成功
  "5": "../../static/images/over.png" // 黑色 结束
};

/**
 * 首页操作项状态
 * */
const INDEX_OPERAT_TYPE = {
  2: 22,// 统计管理
  3: 20, // 应用设置
  4: 21 // 创建考核
};

/**
 * 异议内容
 * */
const DISAGREE = ["达标描述，不清晰", "工作时长不合理", "分配分数不合理", "审查人不合理", "审查时点有问题"];

/**
 * 首页操作栏跳转列表
 * */
const PAGE = ["assess", "review", "analysis", "setup", "feedback", "system_help"];

/**
 * 项目编号
 * */
const CONST_APP_IC = "h200212";

/**
 * 版本号
 * */
const VERSION = "v2.5.2";

/**
 * 请求域名
 * */
const CONST_REQUEST_URI = "https://devphp.hztc.dev.hztcapp.com/test_index.php"; // 开发
// const CONST_REQUEST_URI = "https://hztc.dev.hztcapp.com/index.php"; // 正式

/**
 * 请求地址
 * */
let REQUEST_URI = `${CONST_REQUEST_URI}?r=interface/api&ic=${CONST_APP_IC}`;

/**
 * 设置请求链接
 * */
const SET_REQUEST_URI = (res = "") => {
  REQUEST_URI = `${REQUEST_URI}&qy_id=${res}`;
};

/**
 * 接口列表
 * */
const INTER_FACE = {
  get_system_setting_date: "get_system_setting_date", // 获取时间
  set_withdrawal_review: "set_withdrawal_review", // 撤回审查任务
  set_message_status: "set_message_status", // 设置消息
  get_video_url: "get_video_url",// 获取系统帮助视频
  get_administrators_list: "get_administrators_list", // 获取系统帮助管理员列表
  get_user_power: "get_user_power", // 获取系统帮助权限
  update_task: "update_task", // 修改任务
  set_feedback_content: "set_feedback_content", // 设置反馈
  get_statistical: "get_statistical", // 获取管理员
  del_statistical: "del_statistical", // 删除管理员
  add_statisticians: "add_statisticians", // 添加管理员
  get_notice_list: "get_notice_list", // 获取各种消息
  has_notice: "has_notice", // 获取首页6个操作栏是否有新消息
  get_task_month_list: "get_task_month_list", // 每个月的详情
  get_staff_portrait: "get_staff_portrait", // 员工统计详细信息
  get_personnel_list: "get_personnel_list", // 获取员工统计
  set_svaluation_and_score: "set_svaluation_and_score", // 审查任务
  get_waiting_for_review_list: "get_waiting_for_review_list", // 获取被审查人列表
  get_review_task_list: "get_review_task_list", // 获取我审查的时间点
  confirm_task: "confirm_task", // 对任务作出决定
  get_reason: "get_reason", // 获取拒绝原因
  get_holders: "get_holders", // 获取执行人 / 审查人
  get_review_result_list: "get_review_result_list", // 获取任务审核详情
  get_task_details: "get_task_details", // 获取任务详情
  get_task_list: "get_task_list", // 获得任务列表
  get_select_enterprise_contact: "get_select_enterprise_contact", // 获取通讯录参数
  append_holder: "append_holder", // 添加 执行人-审查人
  add_task: "add_task", // 新建任务
  set_user_info: "set_user_info", // 设置用户信息
  regist_user: "regist_user" // 注册用户
};

export {
  PEOJECT_STATE,
  REQUEST_URI,
  INDEX_OPERAT_TYPE,
  INTER_FACE,
  PAGE,
  DISAGREE,
  VERSION,
  SET_REQUEST_URI
};
