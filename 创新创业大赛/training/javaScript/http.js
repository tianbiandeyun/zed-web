// 拼接参数
const produceRequestUrl = (im, fps, url, method = "get") => {
    let requestUrl = url;
    let qoute = "?";
    if (/\?/.test(requestUrl)) {
        qoute = "&";
    }
    let baseUrl = requestUrl + qoute + "im=" + im;
    // 如果是 get 则走这个参数拼接
    if (method === "get") {
        for (let name in fps) {
            baseUrl += "&fps[" + name + "]=" + encodeURIComponent(fps[name]).replace(/[!'()]/g, escape).replace(/\*/g, "%2A");
        }
        baseUrl += "&iv=jsonp&callback=";
    }
    // 如果是 post 则直接返回
    return baseUrl;
};

const http = (params, method = 'get') => {

    const [im, fps = {}, url] = [params.im, params.fps, params.url];
    const requestUrl = produceRequestUrl(im, fps, url, method);

    // return new Promise((resolve, reject) => {
    //     resolve(requestUrl)
    // });

    if (method === 'get') {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: method,
                url: requestUrl,
                success(res) {
                    resolve(res);
                },
                error(e) {
                    reject(e);
                }
            });
        });

    } else {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: method,
                url: requestUrl,
                data: JSON.stringify(fps),
                success(res) {
                    resolve(res);
                },
                error(e) {
                    reject(e);
                }
            });
        });
    }

};