import SealUIError from './error'
import utils from './utils'
const prefix = 'SEALUI_STORAGE__'

const get = (key) => {
  return new Promise((resolve, reject) => {
    if (!key) return reject(new SealUIError(10000))
    const value = utils.deserialize(sessionStorage.getItem(prefix + key))
    value
      ? resolve({
        errCode: 0,
        data: {
          key,
          value
        }
      })
      : reject(new SealUIError(10001))
  })
}

const save = (key, value) => {
  return new Promise((resolve, reject) => {
    if (!key) return reject(new SealUIError(10000))
    if (!value) return reject(new SealUIError(10002))
    sessionStorage.setItem(prefix + key, utils.serialize(value))
    return resolve({
      errCode: 0
    })
  })
}

const remove = (key) => {
  return new Promise((resolve, reject) => {
    if (!key) return reject(new SealUIError(10000))
    sessionStorage.removeItem(prefix + key)
    return resolve({
      errCode: 0,
      data: {
        key
      }
    })
  })
}

const clear = () => {
  sessionStorage.clear()
}

export default {
  get,
  save,
  remove,
  clear
}
