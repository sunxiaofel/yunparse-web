import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://192.168.1.3:3001', // 你的接口基础地址
  timeout: 30000,
})

export default instance
