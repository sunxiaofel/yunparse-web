// 导入官方 JS 推荐规则
import js from '@eslint/js'
// 导入浏览器环境的全局变量（如 window、document）
import globals from 'globals'
// React Hooks 的 ESLint 插件
import reactHooks from 'eslint-plugin-react-hooks'
// Vite 使用的 React 热更新插件
import reactRefresh from 'eslint-plugin-react-refresh'
// TypeScript 的 ESLint 插件和配置工具
import tseslint from 'typescript-eslint'
// 用于规范 import 顺序和结构的插件
import eslintPluginImport from 'eslint-plugin-import'
// Prettier 插件：让 ESLint 检查格式问题（配合 .prettierrc 使用）
import eslintPluginPrettier from 'eslint-plugin-prettier'

// 使用 typescript-eslint 的 config() 函数配置 ESLint
export default tseslint.config(
  // 第一段：基础配置
  {
    ignores: ['dist', 'node_modules'], // 忽略 dist 构建目录和 node_modules 依赖
  },
  // 第二段：主要规则配置
  {
    // 只处理 .ts 和 .tsx 文件
    files: ['**/*.{ts,tsx}'],

    // 设置语言环境（ES2020 + 浏览器全局变量）
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },

    // 注册插件
    plugins: {
      'react-hooks': reactHooks, // React Hooks 规范检查
      'react-refresh': reactRefresh, // 限制热更新导出组件
      import: eslintPluginImport, // import 顺序优化
      prettier: eslintPluginPrettier, // 把 Prettier 格式检查集成进 ESLint
    },

    // 自定义规则
    rules: {
      // React Hooks 推荐规则（必须在 hooks 前使用 useXXX，依赖完整等）
      ...reactHooks.configs.recommended.rules,

      // 启用 Prettier 的格式检查，和 .prettierrc 保持一致
      'prettier/prettier': 'warn',

      // 限制 react-refresh 只导出常量组件（防止热更新失败）
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      // 规范 import 顺序（先内置模块，再外部依赖，再内部模块）
      'import/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'internal'], // 分组顺序
          pathGroups: [
            {
              pattern: 'react', // React 放最前面
              group: 'external',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['react'],
          alphabetize: {
            order: 'asc', // 按字母顺序排列
            caseInsensitive: true, // 忽略大小写
          },
        },
      ],
    },
  }
)
