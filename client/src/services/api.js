import axios from 'axios'

const api = axios.create({
  baseURL: "http://10.120.48.53:3001"
})

export default api