const inquirer = require('inquirer')
const pageChoices = [
  new inquirer.Separator('----------------------------------------'),
  {
    name: `课堂页 --> coursePage`,
    value: 'coursePage'
  },
  {
    name: `回放页 --> playBackCourseVideoPage`,
    value: 'playBackCourseVideoPage'
  },
  new inquirer.Separator('----------------------------------------')
]

const positionsChoices = [
  new inquirer.Separator('----------------------------------------'),
  {
    name: '主讲视频区域  -->     PAGE_COURSE_LIVE_MAIN',
    value: 'PAGE_COURSE_LIVE_MAIN'
  },
  {
    name: '顶部          -->     PAGE_COURSE_TOP',
    value: 'PAGE_COURSE_TOP'
  },
  {
    name: '左部          -->     PAGE_COURSE_LEFT',
    value: 'PAGE_COURSE_LEFT'
  },
  {
    name: '右部          -->     PAGE_COURSE_RIGHT',
    value: 'PAGE_COURSE_RIGHT'
  },
  {
    name: '全局          -->     PAGE_COURSE_GLOBAL',
    value: 'PAGE_COURSE_GLOBAL'
  },
  new inquirer.Separator('----------------------------------------')
]

module.exports = {
  pageChoices,
  positionsChoices
}
