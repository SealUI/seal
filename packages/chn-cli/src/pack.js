#!/usr/bin/env node

const fs = require('fs')
const archiver = require('archiver')
const chalk = require('chalk')
const ora = require('ora')

/**
 * 格式化字节
 *
 * @Author 听着情歌流泪
 * @Date   2019-06-05T10:51:14+0800
 * @param  {[type]}                 bytes [description]
 * @return {[type]}                       [description]
 */
const bytesToSize = (bytes) => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  if (bytes === 0) return '0 Byte'
  let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10)
  return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i]
}

/**
 * 打包zip
 *
 * @Author 听着情歌流泪
 * @Date   2019-06-05T10:51:20+0800
 * @param  {[type]}                 src  [description]
 * @param  {[type]}                 dest [description]
 * @return {[type]}                      [description]
 */
const pack = (src, dest) => {
  const _dest = dest ? process.cwd() + '/' + dest : process.cwd() + '/dist.zip'
  const spinner = ora(` 正在生成压缩包 ${dest} ...`)
  spinner.start()

  return new Promise((resolve, reject) => {
    let output = fs.createWriteStream(_dest)
    let archive = archiver('zip', {
      zlib: { level: 9 }
    })
    output.on('close', function() {
      spinner.stop()
      resolve(
        `\r\n ✔ 📦 压缩包 ${chalk.bold.magenta(dest)} 构建成功. (压缩包大小：${bytesToSize(
          archive.pointer()
        )})`
      )
    })
    output.on('end', function() {
      // console.info('Data has been drained')
    })
    archive.on('warning', function(err) {
      spinner.stop()
      if (err.code === 'ENOENT') {
        console.warn(err)
      } else {
        reject(err)
      }
    })
    archive.on('error', function(err) {
      spinner.stop()
      reject(err)
    })
    archive.pipe(output)
    archive.directory(src)
    archive.finalize()
  })
}

module.exports = (...args) => {
  return pack(...args)
    .then((res) => {
      console.log(`${chalk.greenBright(res)}`)
    })
    .catch((err) => {
      console.log(`${chalk.redBright(err)}`)
    })
}
