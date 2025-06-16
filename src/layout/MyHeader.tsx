import { Layout, Typography, theme } from 'antd'
import { CustomerServiceOutlined, MoonOutlined, SunOutlined } from '@ant-design/icons'

const { Header } = Layout
const { Title } = Typography

interface Props {
  isDark: boolean
  setIsDark: (isDark: boolean) => void
}

export default function Myheader({ isDark, setIsDark }: Props) {
  const { useToken } = theme
  const { token } = useToken()
  return (
    <Header
      style={{
        height: 50,
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px',
        backgroundColor: token.colorBgBase,
      }}
    >
      <Title
        level={5}
        style={{
          color: token.colorTextBase,
          margin: 0,
          flex: 1,
          userSelect: 'none',
        }}
      >
        <CustomerServiceOutlined style={{ marginRight: '5px' }} />
        网易云音乐解析
      </Title>
      <div
        style={{ cursor: 'pointer' }}
        onClick={() => {
          setIsDark(!isDark)
        }}
      >
        {!isDark ? (
          <SunOutlined style={{ fontSize: 18 }} />
        ) : (
          <MoonOutlined style={{ fontSize: 18 }} />
        )}
      </div>
    </Header>
  )
}
