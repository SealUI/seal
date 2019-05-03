'use strict';
module.exports = {
  types: [
    {
      value: 'feat',
      name : '✨ - feat:     新功能'
    },
    {
      value: 'fix',
      name : '🐞 - fix:      bug修复'
    },
    {
      value: 'refactor',
      name : '🛠  - refactor: 重构代码'
    },
    {
      value: 'docs',
      name : '📚 - docs:     文档改动'
    },
    {
      value: 'test',
      name : '🏁 - test:     添加缺失的测试, 重构测试, 不包括生产代码变动'
    },
    {
      value: 'chore',
      name : '🗯  - chore:    更新构建任务等; 不包括生产代码变动'
    },
    {
      value: 'style',
      name : '💅 - style:    格式化, 缺失分号等; 不包括生产代码变动'
    },
    {
      value: 'revert',
      name : '⏪ - revert:   Revert to a commit'
    }
  ],
  scopes: [],
  allowCustomScopes: true,
  messages: {
    type: '选择一个类型 <type>',
    scope: '\n此更改的范围(可选) <scope>',
    customScope: '此更改的范围',
    subject: '写一个简短的变化描述 <subject>\n',
    body: '更长的变更描述(可选)。使用“|”换行 <body>\n',
    footer: '列出此更改所关闭的任何问题(可选). 例如：#1, #2 <footer>\n',
    confirmCommit: '您确定要继续执行上面的提交吗?'
  },
  allowBreakingChanges: ["feat", "fix"]
};
