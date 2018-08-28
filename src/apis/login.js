import request from '@/utils/request'

const api = {
  login: '/user/login',
  getInfo: '/user/info',
  logout: '/user/logout'
}

function login(username, password) {
  return request({
    url: api.login,
    method: 'post',
    data: {
      username,
      password
    }
  })
}

function getInfo(token) {
  return request({
    url: api.getInfo,
    params: { token }
  })
}

function logout() {
  return request({
    url: api.logout,
    method: 'post'
  })
}

export default {
  login,
  getInfo,
  logout
}
