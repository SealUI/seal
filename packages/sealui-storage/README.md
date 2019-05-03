# sealui-storage
给 `localStorage` 整合了过期时间的功能.

`sealui-storage` 同时支持 `localStorage` 和 `sessionStorage`
## 如何使用
`npm install sealui-storage`

```js
import storage from 'sealui-storage'
storage.save('key', 'value', time)
```
`sealui-storage` 返回一个 `Promise`

```
storage.save('key', 'storage', 3000).then(res => {
  console.log(res)
}).catch(err => {
  console.log(res)
})

storage.get('key').then(res => {
  console.log(res)
}).catch(err => {
  console.log(res)
})
```
## API

### save
存储到localStorage中

```js
storage.save(key, value, time)
```
### get
获取localStorage中指定键的值

```js
storage.get(key)
```

### remove
删除localStorage中指定键

```js
storage.remove(key)
```

### clear
清空localStorage

```js
storage.clear(
```
