import { useEffect, useState } from 'react'
import { ConfigProvider, Layout, Divider } from 'antd'
import { getLightTheme, getDarkTheme } from './theme/themeconfig'
import Myheader from './layout/MyHeader'
import MyFooter from './layout/MyFooter'
import MyContent from './layout/MyContent'

const LOCAL_STORAGE_THEME_KEY = 'yunparser-theme-mode'

export default function YunParserWithTheme() {
  // 从 localStorage 读取主题，默认亮色
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_THEME_KEY)
    return saved === 'dark'
  })

  // 监听 isDark 改变，同步到 localStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, isDark ? 'dark' : 'light')
  }, [isDark])

  // 根据状态获取主题配置
  const themeConfig = isDark ? getDarkTheme() : getLightTheme()

  return (
    <ConfigProvider theme={themeConfig}>
      <Layout style={{ minHeight: '100vh', backgroundColor: themeConfig.token.colorBgBase }}>
        <Myheader isDark={isDark} setIsDark={setIsDark} />
        <Divider style={{ margin: 0 }} />
        <MyContent />
        <MyFooter />
      </Layout>
    </ConfigProvider>
  )
}
