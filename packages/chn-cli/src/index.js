#!/usr/bin/env node

console.log()
process.on('exit', () => {
  console.log()
})

const program = require('commander')
const chalk = require('chalk')

const camelize = (str) => {
  return str.replace(/-(\w)/g, (_, c) => (c ? c.toUpperCase() : ''))
}

const cleanArgs = (cmd) => {
  const args = {}
  cmd.options.forEach((o) => {
    const key = camelize(o.long.replace(/^--/, ''))
    if (typeof cmd[key] !== 'function' && typeof cmd[key] !== 'undefined') {
      args[key] = cmd[key]
    }
  })
  return args
}

program
  .version(require('../package').version)
  // .description('输出版本信息')
  .usage('<command> [options]')

// 创建项目
program
  .command('create')
  .description('创建一个模块')
  .action((cmd) => {
    require('../lib/new')
  })

// 编译项目
program
  .command('build')
  .description('编译代码')
  .option('--pack', '创建压缩包')
  .action((cmd) => {
    const options = cleanArgs(cmd)
    require('../lib/build')(options)
  })
// 启动开发环境
program
  .command('dev')
  .description('启动开发环境')
  .action((cmd) => {
    require('../lib/dev')
  })

program
  .command('pack src dest')
  .description('压缩zip包')
  .action((src, dest) => {
    require('../lib/pack')(src, dest)
  })

program.arguments('<command>').action((cmd) => {
  program.outputHelp()
  console.log(`  ` + chalk.red(`Unknown command ${chalk.yellow(cmd)}.`))
  console.log()
})

program.on('--help', () => {
  console.log()
  console.log(`  运行 ${chalk.cyan(`chn <command> --help`)} 了解详细的命令的用法.`)
  console.log()
})

program.commands.forEach((c) => c.on('--help', () => console.log()))

program.parse(process.argv)

if (!process.argv.slice(2).length) {
  program.outputHelp()
}
