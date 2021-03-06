/**
 * 里面的常量不要随意修改，因为 util.js 中会使用到
 * */

/**
 * 项目编号
 * 分享 ID
 * */
export const PROJECT_ID = "h200728";
export const SHARE_ID = "h_200728";

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
    get_jsconf: 'get_jsconf',
    get_prize_user_info: 'get_prize_user_info', // 获取信息
    set_prize_user_info: 'set_prize_user_info', // 保存信息
    send_phone_identifying_code: 'send_phone_identifying_code', // 发送验证码
    get_banner: 'get_banner', // 获取轮播图
    set_luck_draw: 'set_luck_draw', // 抽奖
    get_prize_record_count: 'get_prize_record_count', // 获取剩余抽奖次数
    set_pv_statistics: 'set_pv_statistics', // 设置我想要的
    get_luck_draw_list_info: 'get_luck_draw_list_info', // 翻盘奖品列表
    getbonuslist: 'getbonuslist', // 已领取的奖励
    get_bouns_list_info: 'get_bouns_list_info', // 连续福利列表
    set_prize_record: 'set_prize_record', // 领取奖品
    get_bouns_type_status: 'get_bouns_type_status', // 奖品领取状态
    get_clocked_keep_count: 'get_clocked_keep_count', // 连续签到天数
    get_clocked_list: 'get_clocked_list', // 签到记录
    clock_in_by_day: 'clock_in_by_day', // 签到
    getplayerinfo: 'getplayerinfo', // 用户信息
    getopenid: 'getopenid'
};

/**
 * 奖品类别
 * day 需要签到几天
 * reward 奖品类别
 * image 中奖图片
 * */
export const REWARD_TYPE = {
    1: {
        reward: '谢谢参与'
    },
    2: {
        reward: '恋练有词',
        image: require('../assets/images/2.png')
    },
    3: {
        reward: '三只松鼠'
    },
    4: {
        reward: '腾讯会员'
    },
    16: {
        day: 30,
        reward: '恋练有词：考研英语词汇识记与应用大全'
    },
    10: {
        day: 0,
        reward: 10,
        info: '每天签到'
    },
    11: {
        day: 3,
        reward: 1
    },
    12: {
        day: 5,
        reward: 2
    },
    13: {
        day: 10,
        reward: 3
    },
    14: {
        day: 15,
        reward: 4
    },
    15: {
        day: 20,
        reward: 5
    }
};

