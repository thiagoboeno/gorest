import axios from 'axios'

const axiosSetup = axios.create({
  baseURL: 'https://gorest.co.in/public/v2',
  timeout: 60000,
  // eslint-disable-next-line quote-props
  headers: { 'Authorization': `Bearer ${process.env.VUE_APP_GOREST_TOKEN}` }
})

axiosSetup.interceptors.response.use(
  response => response,
  error => {
    window.location.href = '/error'

    return Promise.reject(error)
  }
)

export default axiosSetup
