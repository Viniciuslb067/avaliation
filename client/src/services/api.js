import axios from 'axios'

const api = axios.create({
  baseURL: "http://10.120.55.72:3333"
})

export default api