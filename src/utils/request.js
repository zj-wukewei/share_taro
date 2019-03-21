import Taro from '@tarojs/taro'

const baseUrl = "http://192.168.1.117:8080/"

function getStorage(key) {
    return Taro.getStorage({ key }).then(res => res.data).catch(() => '')
}

export default async function fetch(options) {
    const { url, payload, method = 'GET', showToast = true } = options
    console.log("options", options)
    const token = await getStorage('token')
    let header = {
        "APP-ID": 4,
        "APP-VERSION": "taro",
        "APP-MODEL": "taro",
    }
    if (token) {
        header['TOKEN'] = token
    }
    if (method === 'POST') {
        header['content-type'] = 'application/json'
    }

    return Taro.request({
        url: baseUrl + url,
        method,
        data: payload,
        mode: 'cors',
        header
    }).then(res => {
        const { statusCode, data } = res
        if (statusCode !== 200 && showToast) {
            Taro.showToast({
                title: "网络请求出差",
                icon: 'none'
            })
        }
        return data
    }).catch(err => {
        console.log('网络请求出差', err)
        if (showToast) {
            Taro.showToast({
                title: err && err.errorMsg || "网络请求出差",
                icon: 'none'
            })
        }
    })
}