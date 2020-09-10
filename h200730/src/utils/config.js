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
    get_application_record: 'get_application_record', // 获取我的投递记录
    get_banner: 'get_banner', // 轮播图
    get_company_job_info_list: 'get_company_job_info_list', // 获取公司发布职位列表
    get_company_list: 'get_company_list', // 获取公司
    add_user_resume: 'add_user_resume', // 添加简历
    get_user_resume: 'get_user_resume', // 获取简历
    send_phone_identifying_code: 'send_phone_identifying_code', // 验证码
    getopenid: 'getopenid'
};

