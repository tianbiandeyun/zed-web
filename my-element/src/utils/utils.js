import Mock from "mockjs";

export const setSessionStorage = (...res) => {
    window.sessionStorage.setItem(res[0], res[1]);
}

export const getSessionStorage = (res) => {
    return window.sessionStorage.getItem(res);
}

export const removeSessionStorage = (res) => {
    window.sessionStorage.removeItem(res);
}

export const generateTable = () => {
    return Mock.mock({
        "table|10": [{
            "id|+1": 1,
            username: "@cname",
            mobile: /^1[0-9]{10}$/,
            "type|1-2": 1,
            email: "@email()",
            create_tiem: '@date("yyyy-MM-dd")',
            "user_state|1": true,
            role: function () {
                return this.user_state ? "超级管理员" : "普通用户";
            },
        }]
    });
}