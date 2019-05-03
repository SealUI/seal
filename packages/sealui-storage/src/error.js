// 前端错误信息定义
const mapErrorMessage = (code) => {
  switch (code) {
    case 10000:
      return '缓存指定的 key 不存在'
    case 10001:
      return '缓存不存在'
    case 10002:
      return '缓存值不能为空'
    case -1:
      return '浏览器版本不支持 localStorage'
    default:
      return 'unknown error'
  }
}

class SealUIError {
  constructor(errCode = -1, errMsg = '') {
    let error = new Error()

    error.errCode = errCode
    error.errMsg = errMsg ? `${errMsg}` : `${mapErrorMessage(errCode)}`
    if (Error.captureStackTrace) {
      // required for non-V8 environments
      Error.captureStackTrace(this)
    }
    return JSON.parse(JSON.stringify(error))
  }
}

export default SealUIError
