import request from '@/utils/request'

const api = {
  getList: '/table/list'
}

function getList(params) {
  return request({
    url: api.getList,
    params
  })
}

export default {
  getList
}
