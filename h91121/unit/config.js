/**
 * 项目编号 CONST_APP_IC
 * */
export const CONST_APP_IC = "h91121";
console.log(CONST_APP_IC);

/**
 * 请求域名
 * */
// export const CONST_REQUEST_URI = 'https://testphp.hztc.dev.hztcapp.com/test_index.php'; // 开发
export const CONST_REQUEST_URI = 'https://hztc.dev.hztcapp.com/index.php'; // 正式
console.log(CONST_REQUEST_URI);

/**
 * 请求地址
 * */
export const CONST_FETCH_REQUEST_URI = CONST_REQUEST_URI + "?r=interface/api&ic=" + CONST_APP_IC;

/**
 *接口名
 * */
export const requestInterface = {
    isSignIn: 'is_sign_in', // 判断是否登陆
    setSignOut: 'set_sign_out', // 退出登录
    getUserInfo: 'get_user_info', // 获取登陆人信息
    getCrawlerData: 'get_crawler_data', // 获取表格信息
    getStatusCount: 'get_status_count', // 获取不同状态下文章数量
    getDisplayCount: 'get_display_count', // 获取文章总数
    getContent: 'get_content', // 获取文章详情
    setStatus: 'set_status', // 设置审阅或者禁止
    getKeyWord: 'get_key_word', // 获取筛选关键字
    getKeyWordCount: 'get_key_word_count', // 获取关键字下文章数量
    hasAuditRight:'has_audit_right' // 判断是否有审核权
};
