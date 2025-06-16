import { Layout, Space, theme } from 'antd'

export default function MyFooter() {
  const { useToken } = theme
  const { token } = useToken()
  const { Footer } = Layout
  return (
    <Footer
      style={{
        textAlign: 'center',
        color: token.colorTextBase + '88', // 底部透明文字
        backgroundColor: token.colorBgBase,
      }}
    >
      © Sunxiaofei | 网易云音乐解析
      <div style={{ margin: '5px 0' }}></div>
      接口由看戏仔提供：
      <a href="https://api.kxzjoker.cn/#">看戏仔</a>
    </Footer>
  )
}
