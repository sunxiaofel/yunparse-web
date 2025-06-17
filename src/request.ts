import axios from 'axios'

const instance = axios.create({
  // baseURL: 'http://192.168.1.3:3001', // 你的接口基础地址
  baseURL: 'https://proxy-server.sunxiaofei1422.workers.dev',
  timeout: 30000,
})

export default instance
