#!/usr/bin/env node
process.on('exit', () => {
  console.log()
})
const execa = require('execa')
const inquirer = require('inquirer')
const chalk = require('chalk')

const serve = async (options) => {
  let environmentName
  let environment
  if (!options) {
    const { env } = await inquirer.prompt([
      {
        name: 'env',
        message: '选择一个启动环境',
        type: 'list',
        choices: [
          {
            name: '🛵 开发域名',
            value: 'dev:dev'
          },
          {
            name: '🛩  测试域名',
            value: 'dev:test'
          },
          {
            name: '🚀 线上域名',
            value: 'dev:prod'
          }
        ]
      }
    ])
    environment = env
  } else {
    if (options === 'dev' || options === 'prod' || options === 'online') {
      environment = `dev:${options}`
    } else {
      environment = options
    }
  }

  if (environment === 'dev:prod' || environment === 'prod' || environment === 'online') {
    environmentName = '线上域名'
  } else if (environment === 'dev:test' || environment === 'test') {
    environmentName = '测试域名'
  } else {
    environmentName = '开发域名'
  }

  const { yes } = await inquirer.prompt([
    {
      name: 'yes',
      type: 'confirm',
      message(answers) {
        return `⁉ 确定启动 ${chalk.magenta.bold(environmentName)} ?`
      }
    }
  ])

  if (yes) {
    try {
      await execa('npm', ['run', environment], { stdio: 'inherit' })
    } catch (e) {}
  }
}
module.exports = (...args) => {
  serve(...args).catch((err) => {
    console.error(err)
    process.exit(1)
  })
}
