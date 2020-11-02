import unit from './unit'

console.log(`测试参数：${unit.getUrlParam('test_date')}`);


/**
 * 项目编号 CONST_APP_IC
 * */
export const CONST_APP_IC = "h200103";
console.log(CONST_APP_IC);

/**
 * 分享
 * */
export const CONST_APP_TOKEN = "h_200103";
console.log(CONST_APP_TOKEN);

/**
 * 请求域名
 * */
// export const CONST_REQUEST_URI = 'https://devphp.hztc.dev.hztcapp.com/test_index.php'; // 开发
export const CONST_REQUEST_URI = 'https://hztc.dev.hztcapp.com/index.php'; // 正式
console.log(CONST_REQUEST_URI);
/**
 * 分享
 * */
export const CONST_RESPEC_URI = 'https://f.hztc.dev.hztcapp.com';
console.log(CONST_RESPEC_URI);

/**
 * 请求地址
 * */
// export const CONST_FETCH_REQUEST_URI = CONST_REQUEST_URI + "?r=interface/api&ac=lett&ic=" + CONST_APP_IC;

export let CONST_FETCH_REQUEST_URI = '';
if (unit.getUrlParam('test_date') === undefined || unit.getUrlParam('test_date') === '' || unit.getUrlParam('test_date') === null) {
    CONST_FETCH_REQUEST_URI = CONST_REQUEST_URI + "?r=interface/api&ac=lett&ic=" + CONST_APP_IC;
} else {
    CONST_FETCH_REQUEST_URI = CONST_REQUEST_URI + "?r=interface/api&ac=lett&ic=" + CONST_APP_IC + "&test_date=" + unit.getUrlParam('test_date');
}

console.log(`拼接地址：${CONST_FETCH_REQUEST_URI}`);

export const CONST_SHARE_URI = CONST_RESPEC_URI + "/h/retobridge.html?";

/**
 *接口名
 * */
export const requestInterface = {
    getOpenid: 'getopenid', // 获取 oienid
    setWxPaymentInfo: 'set_new_wx_payment_info', // 支付配置
    getScheduledDate: 'get_scheduled_date', // 获取可以预约的日期 7 天

    getJsconf: 'get_jsconf',
    getCardBooking: 'get_card_booking', // 获取预约的时间
    setCardIdRecord: 'set_card_id_record', // 付款之后，设置预约时间
    setCardIdStatus: 'set_card_id_status', // 领取完卡劵之后，设置卡劵领取记录
    getCardConfig: 'get_card_config', // 获取卡劵配置
    setAcrdType: 'set_acrd_type', // 设置卡劵id
    hasReceiveCardChance: 'has_receive_card_chance' // 判断领取卡劵机会


};
