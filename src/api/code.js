import request from '../utils/request'
export default () => request({
  url: '/auth/code',
  method: 'get'
})
