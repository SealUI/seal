# `chn-cli`

大语文模块生成器

- 自动在指定的页面下生成设定的模块，并挂载在相应的区域里
- 根据输入的指令自动生成 `vuex`模块

> 使用之前需要修改项目的部分设置，请配合使用

## 使用方法

### 全局安装

```
npm install chn-cli -g

chn
```

### 本地安装

```
npm install chn-cli -D
```

修改 `packages.json`的 `scripts`字段

```json
{
  "scripts": {
    "new": "chn"
  }
}
```

```
npm run new
```
