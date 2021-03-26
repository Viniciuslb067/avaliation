import axios from 'axios'

const api = axios.create({
  baseURL: "http://198.18.10.246:3333"
})

export default api