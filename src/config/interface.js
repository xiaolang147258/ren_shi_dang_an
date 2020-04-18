import axios from 'axios'
import api from './api'

export const getUserInfo = () => {
  return axios({
    url: api.users,
    method: 'get'
  })
}
export const getToken = (code) => {
  return axios({
    url: api.token,
    method: 'post',
    data: {
      code: code
    }
  })
}
