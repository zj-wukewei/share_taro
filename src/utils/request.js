import Taro from '@tarojs/taro'

const baseUrl = "http://10.168.30.132:8080/"

export const getStorage = (key) => {
  return Taro.getStorage({ key }).then(res => res.data).catch(() => '')
}

export const updateStorage = (data = {}) => {
  return Promise.all([
    Taro.setStorage({
      key: 'token',
      data: data['token'] || ''
    }),
    Taro.setStorage({
      key: 'uid',
      data: data['uid'] || ''
    })
  ])
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
  const { url, payload, method = 'GET', showToast = true} = options
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
    })
    .then(checkStatus)
    .then(res => {
      const { code, data, msg } = res.data
      if (code !== 0) {
        if (code == -1001) {
          //跳转到登录页面
          Taro.navigateTo({
            url: '/pages/login/index'
          })
          throw new Error(msg)
        }

        if (showToast) {
          Taro.showToast({
            title: msg,
            icon: 'none'
          })
          throw new Error(msg)
        } else {
          return res.data
        }

      }
      return data
    }).catch(err => {
      throw new Error(err && err.errMsg || "服务器正在维护中!")
    })
}