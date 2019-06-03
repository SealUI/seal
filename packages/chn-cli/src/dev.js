#!/usr/bin/env node

console.log()
process.on('exit', () => {
  console.log()
})
const execa = require('execa')
const inquirer = require('inquirer')
const chalk = require('chalk')

const dev = async () => {
  const { environment } = await inquirer.prompt([
    {
      name: 'environment',
      message: '选择一个启动环境',
      type: 'list',
      choices: [
        {
          name: '🛵 开发域名',
          value: 'dev'
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

  let environmentName
  if (environment === 'dev:prod') {
    environmentName = '线上域名'
  } else if (environment === 'dev:test') {
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

dev().catch((err) => {
  console.error(err)
  process.exit(1)
})
