/**
 * 项目编号
 * */
const CONST_APP_IC = "h201104";

/**
 * 版本号
 * */
const VERSION = "v3.0.3";

/**
 * 请求域名
 * */
const CONST_REQUEST_URI = "https://testphp.hztc.dev.hztcapp.com/test_index.php"; // 开发
// const CONST_REQUEST_URI = "https://hztc.dev.hztcapp.com/index.php"; // 正式

/**
 * 请求地址
 * */
const REQUEST_URI = `${CONST_REQUEST_URI}?r=interface/api&ic=${CONST_APP_IC}`;

/**
 * 接口列表
 * */
const INTER_FACE = {
  get_chat_record_info: 'get_chat_record_info',
  get_chat_record_list: "get_chat_record_list",
  get_activity_id: "get_activity_id",
  get_member_info: "get_member_info",
  make_img_route: "make_img_route",
  update_user_info: "update_user_info",
  get_user_info: "get_user_info",
  get_user_sign_up_status: "get_user_sign_up_status",
  get_salon_activity_info: "get_salon_activity_info",
  get_salon_activity_list: "get_salon_activity_list",
  getplayerinfo: "getplayerinfo",
  set_update_user_info: "set_update_user_info",

  set_user_photo: "set_user_photo",
  get_registration_info: "get_registration_info",
  has_punch_the_clock: "has_punch_the_clock",
  set_enter_info: "set_enter_info",
  get_organizers_info: "get_organizers_info",
  set_registration: "set_registration",
  get_member_checkin_info: "get_member_checkin_info",
  has_registration: "has_registration",
  set_punch_the_clock: "set_punch_the_clock",
  get_activity_member_list: "get_activity_member_list",
  get_user_phone: "get_user_phone",
  xi_login: "xi_login"
};

export {
  REQUEST_URI,
  INTER_FACE
};
