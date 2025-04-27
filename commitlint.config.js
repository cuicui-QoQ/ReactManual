module.exports = {
    // 继承的规则
    extends: ['@commitlint/config-conventional'],
    // 定义规则类型
    rules: {
        // type的类型定义，表示git提交的tyoe必须在一下类型范围内
        'type-enum': [
            // 错误级别
            2,
            'always',
            // 泛型内容
            [
                'feat',
                'fix',
                'docs',
                'style',
                'refactor',
                'perf',
                'test',
                'chore',
                'revert',
                'build',
            ],
        ],
        // subject不进行大小写校验
        'subject-case': [0, 'never', ['sentence-case']],
    },
}
