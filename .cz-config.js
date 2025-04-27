module.exports = {
    types: [
        {
            value: 'feat',
            name: 'feat: 新功能',
        },
        {
            value: 'fix',
            name: 'fix: 修复bug',
        },
        {
            value: 'docs',
            name: 'docs: 文档变更',
        },
        {
            value: 'style',
            name: 'style: 代码格式(不影响功能，例如空格、分号等格式修正)',
        },
        {
            value: 'refactor',
            name: 'refactor: 重构(既不是新增功能，也不是修改bug的代码变动)',
        },
        {
            value: 'perf',
            name: 'perf: 性能优化',
        },
        {
            value: 'test',
            name: 'test: 增加测试',
        },
        {
            value: 'chore',
            name: 'chore: 构建过程或辅助工具的变动',
        },
        {
            value: 'revert',
            name: 'revert: 回滚到上一个版本',
        },
        {
            value: 'build',
            name: 'build: 打包',
        },
    ],
    // 步骤
    messages: {
        type: '选择你要提交的类型 :',
        customScope: '请输入修改范围(可选):',
        subject: '填写简短精炼的变更描述(必选择):\n',
        body: '填写更加详细的变更描述(可选):\n',
        footer: '列举出所有变更的 ISSUES(可选):\n',
        confirmCommit: '确认使用以上信息提交？(y/n)',
    },
    subjectLimit: 100,
}
