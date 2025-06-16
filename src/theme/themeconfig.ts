// themeConfig.ts
import { theme } from 'antd'

export const getLightTheme = () => ({
  algorithm: theme.defaultAlgorithm,
  token: {
    colorPrimary: '#1890ff',
    colorBgBase: '#fff',
    colorTextBase: '#000',
    // 你可以继续扩展更多token变量，动态传入
  },
})

export const getDarkTheme = () => ({
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: '#a61d24',
    colorBgBase: '#141414',
    colorTextBase: '#fff',
  },
})
