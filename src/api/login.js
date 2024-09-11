import request from '../utils/request'
export default data => request({
  method: 'post',
  url: '/auth/login',
  data
})
