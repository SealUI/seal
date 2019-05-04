# `sealui-request`

## Usage

```
import sealuiRequest from 'sealui-request'

sealuiRequest({
  url:'xxxxx',
  data: {
    x: 1,
    y: 2
  },
  retry: 1,
  retryDelay: 2000
  }
}).then(res => {
  console.log(res)
}, err => {
  console.log(err)
})

sealuiRequest({
  url:'xxxxx',
  data: {
    x: 1,
    y: 2
  },
  success: (res) => {
    console.log(res)
  },
  fail: (err) => {
    console.log(err)
  }
})
```

## API

| 参数       | 说明      | 类型       | 默认值       | 可选值       |
|-----------|-----------|-----------|-------------|-------------|
| url | 请求的URL地址 | string | — | — |
| method | HTTP 请求方法 | string | GET | POST、PUT、DELETE、PATCH |
| data | 请求的参数 | object | — | — |
| header | 设置请求的 header，header 中不能设置 Referer。content-type 默认为 application/x-www-form-urlencoded | object | — | — |
| dataType | 返回的数据格式 | string | json | — |
| retry | 请求失败后的重试次数 | number | 3 | — |
| retryDelay | 请求失败后的重试间隔 (毫秒) | number | 2000 | — |
| dataType | 数据类型 | string | json | — |
| timeOut | 请求超时时长 (毫秒) | number | 5000 | — |
| withCredentials | 是否跨域请求 | boolean | false | — |
| beforeRequest | 请求拦截器 | function | — | — |
| afterRequest | 响应拦截器 | function | — | — |
| success | 请求成功切有数据返回 | function | — | — |
| fail | 请求失败 | function | — | — |
| complete | 请求完成，不管是成功还是失败，都会执行 | function | — | — |
