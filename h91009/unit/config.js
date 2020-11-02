/**
 * 选择开发环境
 * */
const type = '开发';
const typeOfUrl = (type) => {
    if ('正式' === type) {
        return 'https://hztc.dev.hztcapp.com/index.php'
    }
    if ('开发' === type) {
        return 'https://devphp.hztc.dev.hztcapp.com/test_index.php'
    }
};

/**
 * 选择分享前缀
 * */
const shareOfUrl = (type) => {
    if ('正式' === type) {
        return 'https://f.hztc.dev.hztcapp.com';
    }
    if ('开发' === type) {
        return 'https://devhtml.f.hztc.dev.hztcapp.com';
    }
};

console.log(`开发环境地址：${type}---${typeOfUrl(type)}`);
console.log('10-31修改');

/**
 * 项目编号 CONST_APP_IC
 * 生成分享地址 CONST_APP_TOKEN
 * */
export const CONST_APP_IC = "h91009";
export const CONST_APP_TOKEN = "h_91009";
console.log(CONST_APP_IC);

/**
 * 请求域名
 * */
export const CONST_REQUEST_URI = typeOfUrl(type);

/**
 * 分享前缀
 * */
export const CONST_RESPEC_URI = shareOfUrl(type);

/**
 * 请求地址
 * */
export const CONST_FETCH_REQUEST_URI = CONST_REQUEST_URI + "?r=interface/api&ic=" + CONST_APP_IC;
export const CONST_SHARE_URI = CONST_RESPEC_URI + "/h/retobridge.html?";

/**
 *接口名
 * */
export const requestInterface = {
    getopenid: 'getopenid', // 获取openid
    getplayerinfo: 'getplayerinfo',
    getJsconf: 'get_jsconf',
    isShareRecord: 'is_share_record', // 获取是否分享
    addShareRecord: 'add_share_record', // 添加分享记录
    isFollowOfficialAccount: 'is_follow_official_account' // 获取是否关注公众号
};
