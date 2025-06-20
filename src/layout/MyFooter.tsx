import { Layout, theme } from 'antd'

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
      <div>© Sunxiaofei | 网易云音乐解析</div>
      <div style={{ margin: '5px 0' }}>
        接口由看戏仔提供：
        <a href="https://api.kxzjoker.cn/#">看戏仔</a>
      </div>
      <div>
        本站使用
        <a target="_blank" href="https://react.dev">
          React
        </a>
        ➕
        <a target="_blank" href="https://ant-design.antgroup.com">
          Ant-design
        </a>
        开发
      </div>
      <div>如有问题 请联系我 QQ：411223871</div>
    </Footer>
  )
}
