import { getLocalInfo, recordName } from './storage_info'
import { createMinHeapByLocalInfo } from './minHeap'
import Local, { get, save, remove, clear } from './storage'
import observer from './observers'
import Session from './session'
import SealUIError from './error'
/**
 * 初始化storage  检查localStorage中存储的localInfo如果有时间过期的先直接删掉
 * 注意： 在初始化阶段字段过期删除并不会触发订阅事件
 *       在使用时建议将此库优先引入项目   项目逻辑待storage初始化完成后再进行
 */
(async () => {
  if (!window.localStorage) {
    throw new SealUIError(-1)
  }
  let localInfo = getLocalInfo()
  const nowTime = new Date().getTime()

  Object.keys(localInfo).forEach((item) => {
    if (localInfo[item] <= nowTime) {
      localStorage.removeItem(item)
      delete localInfo[item]
    }
  })
  localStorage.setItem(recordName, JSON.stringify(localInfo))
  createMinHeapByLocalInfo(localInfo)
})()

export default {
  get,
  save,
  remove,
  clear,
  Local,
  Session,
  on: observer.subscribe.bind(observer),
  off: observer.unsubscribe.bind(observer),
  version: '1.0.0'
}
