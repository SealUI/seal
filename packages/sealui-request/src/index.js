import axios from 'axios'
import Qs from 'qs'

const defaultConfig = {
  url: '',
  baseURL: '/',
  method: 'POST',
  transformRequest: [function (data) {
    data = Qs.stringify(data)
    return data
  }],
  transformResponse: [function (data) {
    return data
  }],
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'X-Requested-With': 'XMLHttpRequest'
  },
  params: {

  },
  paramsSerializer: function (params) {
    return Qs.stringify(params)
  },
  data: {

  },
  timeout: 10000,
  retry: 3,
  retryDelay: 1000,
  withCredentials: true,
  responseType: 'json',
  maxContentLength: 2000,
  validateStatus: function (status) {
    return status >= 200 && status < 300 // default
  },
  maxRedirects: 5
}

const checkErrorMsg = (error) => {
  if (error && error.response) {
    switch (error.response.status) {
      case 400:
        error.message = '错误请求'
        break
      case 401:
        error.message = '未授权，请重新登录'
        break
      case 403:
        error.message = '拒绝访问'
        break
      case 404:
        error.message = '请求错误,未找到该资源'
        break
      case 405:
        error.message = '请求方法未允许'
        break
      case 408:
        error.message = '请求超时'
        break
      case 500:
        error.message = '服务器端出错'
        break
      case 501:
        error.message = '网络未实现'
        break
      case 502:
        error.message = '网络错误'
        break
      case 503:
        error.message = '服务不可用'
        break
      case 504:
        error.message = '网络超时'
        break
      case 505:
        error.message = 'http版本不支持该请求'
        break
      default:
        error.message = `连接错误${error.response.status}`
    }
    error.code = error.response.status
  } else {
    error.code = -1
    error.message = '连接到服务器失败'
  }
  return {
    'errCode': error.code,
    'errMsg': error.message
  }
}

const request = ({ url = '', method = 'GET', data = {}, header = {}, dataType = 'json', withCredentials = false, retry = 3, retryDelay = 2000, timeOut = 5000, beforeRequest = null, afterRequest = null, success = null, fail = null, complete = null }) => {
  let config = {
    method: method,
    url: url,
    data: data,
    responseType: dataType,
    dataType: dataType,
    timeout: timeOut,
    headers: header,
    retry: retry,
    retryDelay: retryDelay,
    withCredentials: withCredentials,
    beforeRequest: beforeRequest,
    afterRequest: afterRequest,
    success: success,
    fail: fail,
    complete: complete
  }
  let opts = Object.assign(defaultConfig, config || {})

  if (method.toUpperCase() === 'GET' || method.toUpperCase() === 'DELETE') {
    opts.params = data || ''
  }
  if (method.toUpperCase() === 'POST' || method.toUpperCase() === 'PUT' || method.toUpperCase() === 'PATCH') {
    opts.params = ''
  }

  /**
   * 请求拦截器
   */
  axios.interceptors.request.use(function (opts) {
    if (opts.beforeRequest && typeof opts.beforeRequest === 'function') {
      opts.beforeRequest()
    }
    return opts
  }, function (err) {
    if (opts.fail && typeof opts.fail === 'function') {
      return opts.fail(checkErrorMsg(err))
    }
    /* 请求错误时做些事 */
    return Promise.reject(checkErrorMsg(err))
  })

  /**
   * 响应拦截器
   */
  axios.interceptors.response.use((response) => {
    if (opts.afterRequest && typeof opts.afterRequest === 'function') {
      opts.afterRequest()
    }
    return response
  }, (err) => {
    let config = err.config
    // 如果配置不存在或重试选项没有设置，则直接返回拒绝
    if (!config || !config.retry) return Promise.reject(err)
    // 设置重试次数变量
    config.__retryCount = config.__retryCount || 0
    // 检查一下是否已经把重试的总数画满了
    if (config.__retryCount >= config.retry) {
      return Promise.reject(checkErrorMsg(err))
    }

    // 增加重试计数
    config.__retryCount += 1
    // Create new promise to handle exponential backoff
    let backoff = new Promise(function (resolve) {
      setTimeout(function () {
        resolve()
      }, config.retryDelay || 1)
    })
    // 返回让axios重试请求
    return backoff.then(function () {
      return axios(config)
    })
  })

  return new Promise((resolve, reject) => {
    axios(opts).then((resource) => {
      if (opts.success && typeof opts.success === 'function') {
        return opts.success(resource.data)
      }
      return resolve(resource.data)
    }).catch((error) => {
      if (opts.fail && typeof opts.fail === 'function') {
        return opts.fail(error)
      }
      return reject(error)
    }).finally(() => {
      if (opts.complete && typeof opts.complete === 'function') {
        return opts.complete()
      }
    })
  })
}

export default request
