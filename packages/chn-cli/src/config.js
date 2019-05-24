const inquirer = require('inquirer')
const studentConfig = require('./student')
const lecturerConfig = require('./lecturer')
const tutorConfig = require('./tutor')

const config = {
  client: [
    new inquirer.Separator('--------------------'),
    {
      name: '👨‍🎓  学生端',
      value: 'student'
    },
    {
      name: '👨‍🏫  授课端',
      value: 'lecturer'
    },
    {
      name: '👩‍💼  辅导端',
      value: 'tutor'
    },
    new inquirer.Separator('--------------------')
  ],
  student: {
    pages: studentConfig.pageChoices,
    positions: studentConfig.positionsChoices
  },
  lecturer: {
    pages: lecturerConfig.pageChoices,
    positions: lecturerConfig.positionsChoices
  },
  tutor: {
    pages: tutorConfig.pageChoices,
    positions: tutorConfig.positionsChoices
  },
  messages: {
    client: '选择一个客户端类型: ',
    pageName: '📒 模块所属页面: ',
    position: '⛳ 模块挂载位置: ',
    vuex: '⏳ 是否启用vuex: ',
    moduleName: '📦 输入模块名: '
  }
}

module.exports = config
