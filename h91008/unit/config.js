/**
 * 正式还是开发
 * */
const type = '正式';
const typeOfUrl = (type) => {
    if ('正式' === type) {
        return 'https://hztc.dev.hztcapp.com/index.php'
    }
    if ('开发' === type) {
        return 'https://devphp.hztc.dev.hztcapp.com/test_index.php'
    }
};

console.log(`地址：${type}---${typeOfUrl(type)}`);

/**
 *项目编号
 * */
export const CONST_APP_IC = "h91008";
console.log(CONST_APP_IC);

/**
 * 请求链接
 * */
export const CONST_REQUEST_URI = typeOfUrl(type);

/**
 * 请求地址
 * 只有请求 接口 的时候，才用到
 * */
export const CONST_FETCH_REQUEST_URI = CONST_REQUEST_URI + "?r=interface/api&ic=" + CONST_APP_IC;

/**
 *接口名
 * */
export const requestInterface = {
    getopenid: 'getopenid', // 获取openid
    sendphoneidentifyingcode: 'send_phone_identifying_code', // 发送验证码
    adduserinfo: 'add_user_info', // 提交信息
    getcardconfig: 'get_card_config', // 获取卡劵配置
    setCardRecord: 'set_card_record', // 领取卡券之后，设置已领取记录
    hasCardRecord: 'has_card_record', // 判断是否领取卡券
    setOrderInformation: 'set_order_information', // 获取微信支付配置
    setPaymentRecord: 'set_payment_record', // 支付成功后，设置已支付记录
    hasPaymentRecord: 'has_payment_record' // 判断是否支付
};
