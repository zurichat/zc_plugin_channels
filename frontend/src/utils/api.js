import axios from 'axios'

const baseURL = ''

const defaultConfig = {
  baseURL,
  timeout: 60000,
  headers: {
    'Content-type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
}

const api = axios.create({ ...defaultConfig })

api.interceptors.request.use(
  config => {
    const token = '' // Whatever the token is
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  },
  err => Promise.reject(err),
)
class APIServices {
  // @desc End Point Example
  async getUsers(data) {
    return api.post('/some-endpoint', data)
  }
}

const instance = new APIServices()

export default instance
