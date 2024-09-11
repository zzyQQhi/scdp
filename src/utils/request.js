import axios from 'axios'
const request = axios.create({
  baseURL: 'http://82.157.146.153:8900',
  timeout: 5000
})
request.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})
request.interceptors.response.use(result => {
  return result.data
}, error => {
  return Promise.reject(error)
})
export default request
