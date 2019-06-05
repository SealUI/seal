#!/usr/bin/env node

process.on('exit', () => {
  console.log()
})
const execa = require('execa')
const inquirer = require('inquirer')
const chalk = require('chalk')

const getDates = () => {
  let d = new Date()
  let year = d.getFullYear()
  let month = d.getMonth() + 1
  let day = d.getDate()
  let h = d.getHours()
  if (month < 10) month = '0' + month
  if (day < 10) day = '0' + day
  if (h < 10) h = '0' + h
  return year + month + day + '-' + h
}

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
  let environmentEnName
  if (environment === 'build:prod') {
    environmentName = '生产环境'
    environmentEnName = 'production'
  } else if (environment === 'build:test') {
    environmentName = '测试环境'
    environmentEnName = 'test'
  } else {
    environmentName = '开发环境'
    environmentEnName = 'development'
  }

  const { pack } = await inquirer.prompt([
    {
      name: 'pack',
      type: 'confirm',
      message: '是否生成压缩包?'
    }
  ])
  let projectName
  if (pack) {
    projectName = require(process.cwd() + '/package.json').projectName
  }
  const message = pack
    ? `⁉ 确定编译 ${chalk.magenta.bold(environmentName)} 并生成 ${chalk.magenta.bold('压缩包')}?`
    : `⁉ 确定编译 ${chalk.magenta.bold(environmentName)}?`
  const { yes } = await inquirer.prompt([
    {
      name: 'yes',
      type: 'confirm',
      message(answers) {
        return message
      }
    }
  ])

  if (yes) {
    // const spinner = ora(`正在编译 ${environmentName} ...`)
    try {
      await execa('npm', ['run', environment], { stdio: 'inherit' })
      // spinner.stop()
      return {
        yes,
        pack,
        environmentName,
        environmentEnName,
        projectName
      }
    } catch (e) {}
  } else {
    return { yes }
  }
}

build()
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
  .then((res) => {
    if (!res.yes) {
      console.log(chalk.yellowBright('  🔐  取消编译...'))
      process.exit(1)
    }
    if (res.environmentName) {
      console.log(chalk.greenBright(` ✔ 🛠  ${res.environmentName} 编译完成...`))
    }
    if (res.pack) {
      require('./pack')(
        'dist',
        res.projectName + '_' + res.environmentEnName + '_' + getDates() + '.zip'
      )
    }
  })
