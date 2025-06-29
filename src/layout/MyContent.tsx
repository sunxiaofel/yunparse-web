import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Layout,
  message,
  Row,
  Select,
  Space,
  Spin,
  theme,
  Typography,
} from 'antd'
// import data from '../data.json'
import MyAPlayer from '../components/MyPlayer'
import { parseMusic } from '../api'
import { useState } from 'react'
interface IFormValues {
  parse_url: string
  parse_level: string
  type: string
}

export default function MyContent() {
  const [messageApi, contextHolder] = message.useMessage()
  const { Content } = Layout
  const [music] = Form.useForm()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [tip, setTip] = useState<null | string>(null)
  const onParse = () => {
    // console.log('解析:', input)
    const values = music.getFieldsValue()
    if (values.parse_url && values.parse_level) {
      music.submit()
    } else {
      return messageApi.warning('请填写所有字段！')
    }
  }

  // 验证用户输入的是否是网易云音乐链接
  // @ts-ignore
  function isNetEaseMusicLink(url) {
    if (!Array.isArray(url)) return false
    // const pattern =
    //   /^https?:\/\/(music\.163\.com(\/#)?\/song\?[^ ]+|y\.music\.163\.com\/m\/song\?[^ ]+|163cn\.tv\/\w+)$/
    const pattern = /^https?:\/\/([a-z0-9-]+\.)*163\.(com|cn)(\/[^?#]*)?([?&]id=\d+)/i
    return pattern.test(url[0].trim())
  }

  const { Title } = Typography
  const { useToken } = theme
  const { token } = useToken()

  const levelOptions = [
    { label: '标准音质', value: 'standard' },
    { label: '极高品质', value: 'exhigh' },
    { label: '无损音质', value: 'lossless' },
    { label: 'Hi-Res音质', value: 'hires' },
    { label: '高清环绕声', value: 'jyeffect' },
    { label: '沉浸环绕声', value: 'sky' },
    { label: '超清母带', value: 'jymaster' },
  ]

  const onFinish = async (values: IFormValues) => {
    const { parse_url, parse_level } = values
    // if (!isLink(parse_url)) return messageApi.warning('请输入正确的网易云音乐链接！')
    // @ts-ignore
    const splitUrl = parse_url?.match(/https?:\/\/\S+/)
    // @ts-ignore
    if (!isNetEaseMusicLink(splitUrl)) return messageApi.warning('请输入正确的网易云音乐链接！')
    try {
      setData(null)
      setTip('解析中...')
      setLoading(true) // 请求开始，显示loading
      // @ts-ignore
      const res = await parseMusic({ url: splitUrl[0], level: parse_level, type: 'json' })
      if (res.data.status === 200) {
        setData(res.data)
        music.setFieldsValue(res.data)
      } else {
        setData(null)
        // @ts-ignore
        messageApi.error(res.msg)
      }
      console.log('🚀 ~ onFinish ~ res:', res)
    } catch (error) {
      console.error(error)
      // 可以提示用户请求失败
    } finally {
      setTip(null)
      setLoading(false) // 请求结束，隐藏loading
    }
  }

  const onReset = () => {
    music.resetFields()
    setData(null)
  }

  const down = async () => {
    // @ts-ignore
    const url = data.url // 你的音频 URL
    try {
      setTip('下载中...')
      setLoading(true) // 请求开始，显示loading
      const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
      })
      const blob = await response.blob()
      const a = document.createElement('a')
      const blobUrl = URL.createObjectURL(blob)
      a.href = blobUrl
      // @ts-ignore
      a.download = `${data.name} - ${data.ar_name}.mp3` // 自定义文件名
      a.style.display = 'none'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(blobUrl) // 释放内存
    } catch (error) {
      console.error('下载失败：', error)
    } finally {
      setTip(null)
      setLoading(false) // 请求结束，隐藏loading
    }
  }

  return (
    <Spin spinning={loading} tip={tip}>
      <Content style={{ padding: 20 }}>
        {contextHolder}
        <Row justify="center" gutter={[16, 16]} style={{ margin: '0 auto' }}>
          <Col xs={24} flex="auto">
            <Title
              level={3}
              style={{
                color: token.colorTextBase,
                margin: 0,
                flex: 1,
                textAlign: 'center',
              }}
            >
              网易云音乐解析工具
            </Title>
          </Col>

          <Col xs={24}>
            <Form
              name="music"
              form={music}
              onFinish={onFinish}
              onReset={onReset}
              labelCol={{ span: 2 }}
            >
              <Col xs={24}>
                <Form.Item name="parse_url" label="解析地址">
                  <Input placeholder="请输入网易云音乐地址" />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item name="parse_level" label="选择音质">
                  <Select options={levelOptions} placeholder="请选择解析音质" />
                </Form.Item>
              </Col>
              <Row style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div></div>
                <Space>
                  <Button type="primary" size="middle" block onClick={onParse}>
                    开始解析
                  </Button>
                  <Button size="middle" onClick={onReset}>
                    重置
                  </Button>
                </Space>
              </Row>

              {data ? (
                <Card
                  title="歌曲信息"
                  extra={<a onClick={down}>下载</a>}
                  hoverable
                  style={{ margin: '20px 0' }}
                >
                  <Col xs={24} style={{ margin: '20px 0' }}>
                    <MyAPlayer data={data} />
                  </Col>
                  <Form.Item name="name" label="歌曲名字">
                    <Input disabled />
                  </Form.Item>
                  <Form.Item name="ar_name" label="歌手">
                    <Input disabled />
                  </Form.Item>
                  <Form.Item name="al_name" label="歌曲专辑">
                    <Input disabled />
                  </Form.Item>
                  <Form.Item name="level" label="歌曲音质">
                    <Input disabled />
                  </Form.Item>
                  <Form.Item name="pic" label="歌曲封面">
                    <Input disabled />
                  </Form.Item>
                  <Form.Item name="url" label="歌曲链接">
                    <Input disabled />
                  </Form.Item>
                  <Form.Item name="size" label="歌曲大小">
                    <Input disabled />
                  </Form.Item>
                </Card>
              ) : (
                <></>
              )}
            </Form>
          </Col>
        </Row>
      </Content>
    </Spin>
  )
}
