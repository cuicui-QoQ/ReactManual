const fs = require('fs')
const path = require('path')
const { program } = require('commander')

// 定义命令行参数
program.option('-n, --name <name>', '项目名称').parse(process.argv)

const options = program.opts()

if (!options.name) {
    console.error('请提供项目名称，使用 -n 或 --name 参数')
    process.exit(1)
}

// 项目路径
const packagePath = path.join(__dirname, '../packages', options.name)

// 检查项目是否已存在
if (fs.existsSync(packagePath)) {
    console.error(`项目 ${options.name} 已存在`)
    process.exit(1)
}

// 创建项目目录
fs.mkdirSync(packagePath, { recursive: true })

// 创建 package.json
const packageJson = {
    name: options.name,
    private: true,
    version: '0.0.0',
    scripts: {
        start: 'vite',
        build: 'tsc -b && vite build',
        'build:stg': 'tsc -b && vite build --mode stg',
        lint: 'eslint .',
        preview: 'vite preview',
    },
    engines: {
        node: '20.x',
    },
    dependencies: {
        react: '^18.3.1',
        'react-dom': '^18.3.1',
    },
    devDependencies: {
        '@eslint/js': '^9.9.0',
        '@types/react': '^18.3.3',
        '@types/react-dom': '^18.3.0',
        '@vitejs/plugin-react': '^4.3.1',
        eslint: '^9.9.0',
        'eslint-plugin-react-hooks': '^5.1.0-rc.0',
        'eslint-plugin-react-refresh': '^0.4.9',
        globals: '^15.9.0',
        less: '^4.2.1',
        prettier: '3.3.3',
        typescript: '^5.5.3',
        'typescript-eslint': '^8.0.1',
        vite: '^5.4.1',
    },
}

fs.writeFileSync(
    path.join(packagePath, 'package.json'),
    JSON.stringify(packageJson, null, 2),
)

// 创建 src 目录和入口文件
fs.mkdirSync(path.join(packagePath, 'src'))
fs.writeFileSync(
    path.join(packagePath, 'src', 'index.tsx'),
    `import React from 'react';
import { createRoot } from 'react-dom/client';

const App = () => <h1>Hello, ${options.name}!</h1>;

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}`,
)

// 创建 index.html
fs.writeFileSync(
    path.join(packagePath, 'index.html'),
    `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${options.name}</title>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/index.tsx"></script>
</body>
</html>`,
)

// 创建 vite.config.js
fs.writeFileSync(
    path.join(packagePath, 'vite.config.js'),
    `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'

export default defineConfig({
    plugins: [react()],
    root: './',
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '/src'),
        },
    },
});`,
)

console.log(`项目 ${options.name} 创建成功，路径：${packagePath}`)
