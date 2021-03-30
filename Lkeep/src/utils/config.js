/**
 * 项目编号
 * */
const CONST_APP_IC = "h201104";

/**
 * 版本号
 * */
const VERSION = "v3.0.2";

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
const INTER_FACE = {};

export {
  REQUEST_URI,
  INTER_FACE
};
