import Taro from '@tarojs/taro'

const baseUrl = "http://10.168.30.132:8080/"

function getStorage(key) {
    return Taro.getStorage({ key }).then(res => res.data).catch(() => '')
}

function checkStatus(response) {
    if (response.statusCode >= 200 && response.statusCode < 300) {
      return response;
    }
  
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
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
        checkStatus(res)
        const { code, data, msg } = res.data
        if (code !== 0) {
            if (showToast) {
                Taro.showToast({
                    title: msg,
                    icon: 'none'
                })
                return Promise.reject(msg)
            } else {
                return res.data
            }
        }
        return data
    }).catch(err => {
        console.log('err', err)
        return Promise.reject(err && err.errorMsg || "网络请求出差")
    })
}