/**
 * 项目编号
 * */
export const CONST_APP_IC = "h200716";

/**
 * 项目版本
 * */
export const SERVE = "v 1.0.6";

/**
 * 请求域名
 * */
// export const CONST_REQUEST_URI = 'http://devphp.hztc.dev.hztcapp.com/test_index.php'; // 开发
export const CONST_REQUEST_URI = 'https://hztc.dev.hztcapp.com/index.php'; // 正式

/**
 * 请求地址
 * */
export const CONST_FETCH_REQUEST_URI = CONST_REQUEST_URI + "?r=interface/api&ic=" + CONST_APP_IC;

/**
 *接口名
 * */
export const requestInterface = {
    get_crawler_data_list: 'get_crawler_data_list ', // 获取爬取数据
    get_keyword: 'get_keyword', // 获取关键词
};
