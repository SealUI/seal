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

program.version(require('../package').version).usage('<command> [options]')

// 创建项目
program
  .command('create')
  .description('创建一个模块')
  .action((cmd) => {
    require('./new')
  })

// 编译项目
program
  .command('build')
  .description('编译代码')
  .option('--pack', '根据编译环境创建压缩包')
  .option('--pack-name <pack-name>', '根据输入的 <pack-name> 创建压缩包')
  .allowUnknownOption()
  .action((cmd) => {
    const options = cleanArgs(cmd)
    require('./build')(options)
  })
// 启动开发环境
program
  .command('serve [mode]')
  .description('启动开发环境')
  .allowUnknownOption()
  .action((entry, cmd) => {
    // const options = cleanArgs(cmd)
    require('./serve')(entry, cmd)
  })

program
  .command('pack src dest')
  .description('压缩zip包')
  .action((src, dest) => {
    require('./pack')(src, dest)
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
