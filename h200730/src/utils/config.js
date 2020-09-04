/**
 * 里面的常量不要随意修改，因为 util.js 中会使用到
 * */

/**
 * 项目编号
 * 分享 ID
 * */
export const PROJECT_ID = "h200730";
export const SHARE_ID = "h_200730";

/**
 * 请求域名
 * */
export const PROJECT_REQUEST = 'https://devphp.hztc.dev.hztcapp.com/test_index.php'; // 开发
// export const PROJECT_REQUEST = 'https://hztc.dev.hztcapp.com/index.php'; // 正式

/**
 * 分享域名
 * */
export const PROJECT_SHARE_REQUEST = 'https://devhtml.f.hztc.dev.hztcapp.com'; // 开发
// export const PROJECT_SHARE_REQUEST = 'https://f.hztc.dev.hztcapp.com'; // 正式

/**
 * REQUEST_URL 请求地址（根据 请求域名 的切换来实现，开发和正式）
 * REQUEST_SHARE_URL 分享地址（根据 分享域名 的切换来实现，开发和正式）
 * */
export const REQUEST_URL = `${PROJECT_REQUEST}?r=interface/api&ac=hxdf&ic=${PROJECT_ID}`;
export const REQUEST_SHARE_URL = `${PROJECT_SHARE_REQUEST}/h/retobridge.html?`;

/**
 * 接口名
 * */
export const PROJECT_INTERFACE = {
    getopenid: 'getopenid'
};

