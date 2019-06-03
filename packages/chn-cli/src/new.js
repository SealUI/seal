#!/usr/bin/env node

console.log()
process.on('exit', () => {
  console.log()
})

const path = require('path')
const fs = require('fs-extra')

const inquirer = require('inquirer')
const chalk = require('chalk')
const config = require('./config')
const createFile = require('./createFile')

const resolve = (dir) => {
  return path.resolve(process.cwd(), dir)
}
const moduleConfig = `${resolve('src')}/frameworker/moduleManage/moduleConfig.json`

const createNewModule = async () => {
  const messages = config.messages || {}
  const { client } = await inquirer.prompt([
    {
      name: 'client',
      message: messages.client,
      type: 'list',
      choices: [...config.client]
    }
  ])

  const { pageName, vuex, position } = await inquirer.prompt([
    {
      name: 'pageName',
      message: messages.pageName,
      type: 'list',
      choices: [...config[client]['pages']]
    },
    {
      name: 'position',
      message: messages.position,
      type: 'list',
      choices: [...config[client]['positions']],
      default: client === 'student' ? 'PAGE_COURSE_LIVE_MAIN' : ''
    },
    {
      name: 'vuex',
      message: messages.vuex,
      type: 'confirm'
    }
  ])
  const { moduleName } = await inquirer.prompt([
    {
      name: 'moduleName',
      message: messages.moduleName,
      type: 'input',
      validate: function(input) {
        const done = this.async()
        fs.exists(path.resolve(process.cwd(), `src/modules/${pageName}/`, input), (exists) => {
          if (exists) {
            done(` ${chalk.red('✖ ' + input)} 已存在. 请重新输入...`)
          } else {
            done(null, true)
          }
          return
        })
      }
    }
  ])

  let clientName
  if (client === 'student') {
    clientName = '学生端'
  } else if (client === 'lecturer') {
    clientName = '授课端'
  } else {
    clientName = '辅导端'
  }

  const { yes } = await inquirer.prompt([
    {
      name: 'yes',
      type: 'confirm',
      message(answers) {
        const SEP =
          '---------------------------------------------------------------------------------------------'
        return `${SEP}\n  ⁉ 确定在${chalk.magenta.bold(clientName)}的${chalk.cyan(
          pageName
        )}下新建模块${chalk.yellow(moduleName)}并挂载在${chalk.green(
          position
        )}布局下吗?\n  ${SEP}\n`
      }
    }
  ])
  if (yes) {
    let ModulePath = path.resolve(process.cwd(), `src/modules/${pageName}/`, moduleName)
    let msg = await createFile(pageName, moduleName, vuex, position, ModulePath, moduleConfig)
    return msg
  } else {
    return false
  }
}
createNewModule()
  .then((res) => {
    if (res) {
      console.log(
        chalk.bold.green(`
──────────────────────────────────────────────────────

 ✔ ${res} 模块创建成功

──────────────────────────────────────────────────────
        `)
      )
    } else {
      console.log(`取消创建模块...`)
    }
    console.log('')
    process.exit(0)
  })
  .catch((err) => {
    console.log(err, 1)
    process.exit(1)
  })
