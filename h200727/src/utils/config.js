/**
 * 项目编号
 * 分享 ID
 * */
export const PROJECT_ID = "h200727";
export const SHARE_ID = "h_200727";

/**
 * 请求域名
 * */
export const PROJECT_REQUEST = 'https://devphp.hztc.dev.hztcapp.com/test_index.php'; // 开发
// export const PROJECT_REQUEST = 'https://hztc.dev.hztcapp.com/index.php'; // 正式

/**
 * 分享域名
 * */
// export const PROJECT_SHARE_REQUEST = 'https://devhtml.f.hztc.dev.hztcapp.com'; // 开发
export const PROJECT_SHARE_REQUEST = 'https://f.hztc.dev.hztcapp.com'; // 正式

/**
 * REQUEST_URL 请求地址（根据 请求域名 的切换来实现，开发和正式）
 * REQUEST_SHARE_URL 分享地址（根据 分享域名 的切换来实现，开发和正式）
 * */
export const REQUEST_URL = `${PROJECT_REQUEST}?r=interface/api&ac=hxdf&ic=${PROJECT_ID}`;
export const REQUEST_SHARE_URL = `${PROJECT_SHARE_REQUEST}/h/retobridge.html?`;

/**
 *接口名
 * */
export const PROJECT_INTERFACE = {
    set_uv_statistics: 'set_uv_statistics', // uv
    set_pv_statistics: 'set_pv_statistics', // pv
    get_jsconf: 'get_jsconf', // 获取微信配置
    set_video_click_count: 'set_video_click_count', // 设置视频点击次数
    has_user_info: 'has_user_info', // 判断是否填写信息
    send_phone_identifying_code: 'send_phone_identifying_code', // 发送短信
    get_video_list: 'get_video_list', // 获取视频列表
    set_user_info: 'set_user_info', // 设置用户信息
    set_user_organization: 'set_user_organization', // 设置一二级组织
    getopenid: 'getopenid' // 获取 openid
};
