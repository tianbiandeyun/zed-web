/**
 * 项目编号 CONST_APP_IC
 * */
export const CONST_APP_IC = "h200102";
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
    getOpenid: 'getopenid', // 获取 oienid
    getCardConfig: 'get_card_config', // 获取卡劵配置
    setAcrdType: 'set_acrd_type', // 获取卡劵ID
    getAcrdStock: 'get_acrd_stock', // 获取卡劵库存
};
