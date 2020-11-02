/* eslint-disable no-unreachable */
import axios from 'axios'
// import qs from 'qs'

/**
 * 常量
 * */
axios.defaults.withCredentials = true;

/**
 * 拦截器
 * 请求拦截器
 * */
axios.interceptors.request.use(config => {
    // 在发送请求之前做点什么
    return config
}, err => {
    // 对请求错误做点什么
    return Promise.reject(err)
})

/**
 * 拦截器
 * 响应拦截器
 * */
axios.interceptors.response.use(response => {
    // 数据响应做点什么
    return response
}, error => {
    // 数据响应错误做点什么
    return Promise.reject(error)
});

/**
 * 检查状态码
 * */
function checkStatus(res) {
    if (res.status === 200 || res.status === 304) {
        return res.data
    }
    return {
        code: 0,
        msg: res.data.msg || res.statusText,
        data: res.statusText
    };
    // noinspection UnreachableCodeJS
    return res;
}

/**
 * 检查CODE值
 * */
function checkCode(res) {
    if (res.code === 0) {
        throw new Error(res.msg)
    }
    return res
}

export default {
    get(url) {
        return axios({
            method: 'get',
            url,
            timeout: 30000
        }).then(checkStatus).then(checkCode)
    },
    post(url, params) {
        return axios({
            method: 'post',
            url,
            // data: qs.stringify(params),
            data: params,
            timeout: 30000
        }).then(checkStatus).then(checkCode)
    }
}


