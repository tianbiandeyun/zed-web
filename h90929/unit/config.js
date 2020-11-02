/**
 * 正式还是开发
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

console.log(`地址：${type}---${typeOfUrl(type)}`);

/**
 *项目编号
 * */
export const CONST_APP_IC = "h90929";

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
    /**
     * 获取 openid
     * }
     */
    getopenid: 'getopenid',
    /**
     * 获取用户信息
     */
    getplayerinfo: 'getplayerinfo',
    /**
     * 设置每道题目的提交
     * params :{
     *  open_id
     *  key 随机串
     *  title_number 题目编号
     *  answer 结果
     * }
     */
    storageanswerresult: 'storage_answer_result',
    /**
     * 设置最终结果
     * params ：{
     *  open_id
     *  answer 结果
     * }
     */
    setfinalresult: 'set_final_result',
    /**
     * 获取最终结果
     * params : {
     *  open_id
     * }
     */
    getfinalresult: 'get_final_result'
};
