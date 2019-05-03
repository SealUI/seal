import { addLocalInfo, deleteLocalInfo } from './storage_info'
import { clearHeap } from './minHeap'
import SealUIError from './error'
import utils from './utils'
const prefix = 'SEALUI_STORAGE__'

const get = (key) => {
  return new Promise((resolve, reject) => {
    if (!key) return reject(new SealUIError(10000))
    const value = utils.deserialize(localStorage.getItem(prefix + key))
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

/**
 *
 * @param {key} 键
 * @param {value} 值
 * @param {time} 存储时间，毫秒数 如果不传则认为永久存储  time不允许为0
 */
const save = (key, value, time) => {
  if (time === 0) return
  return new Promise((resolve, reject) => {
    if (!key) return reject(new SealUIError(10000))
    if (!value) return reject(new SealUIError(10002))
    if (time) {
      addLocalInfo(key, time)
    }
    localStorage.setItem(prefix + key, utils.serialize(value))
    return resolve({
      errCode: 0
    })
  })
}

/**
 * 删除storage中的某一项
 * @param {key} String 键
 */
const remove = (key) => {
  return new Promise((resolve, reject) => {
    if (!key) return reject(new SealUIError(10000))
    deleteLocalInfo(key)
    localStorage.removeItem(prefix + key)
    return resolve({
      errCode: 0,
      data: {
        key
      }
    })
  })
}

// 清除localStorage
const clear = () => {
  clearHeap()
  localStorage.clear()
}
export { get, save, remove, clear }

export default {
  get,
  save,
  remove,
  clear
}
