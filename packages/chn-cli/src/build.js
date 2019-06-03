#!/usr/bin/env node

console.log()
process.on('exit', () => {
  console.log()
})
const execa = require('execa')
const inquirer = require('inquirer')
const chalk = require('chalk')

const build = async () => {
  const { environment } = await inquirer.prompt([
    {
      name: 'environment',
      message: '选择一个构建环境',
      type: 'list',
      choices: [
        {
          name: '🚀 生产环境  -- 线上域名',
          value: 'build:prod'
        },
        {
          name: '🛩  测试环境  -- 测试域名',
          value: 'build:test'
        },
        {
          name: '🛵 开发环境  -- 开发域名',
          value: 'build:dev'
        }
      ]
    }
  ])

  let environmentName
  if (environment === 'build:prod') {
    environmentName = '生产环境'
  } else if (environment === 'build:test') {
    environmentName = '测试环境'
  } else {
    environmentName = '开发环境'
  }
  const { yes } = await inquirer.prompt([
    {
      name: 'yes',
      type: 'confirm',
      message(answers) {
        return `⁉ 确定编译 ${chalk.magenta.bold(environmentName)} ?`
      }
    }
  ])

  if (yes) {
    try {
      await execa('npm', ['run', environment], { stdio: 'inherit' })
    } catch (e) {}
  }
}

build().catch((err) => {
  console.error(err)
  process.exit(1)
})
