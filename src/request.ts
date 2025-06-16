import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:3001', // 你的接口基础地址
  timeout: 30000,
})

export default instance
