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
    switch (error.response.status) {
      case 400:
      case 401:
      case 403:
      case 404:
      case 500:
        window.location.href = '/error'
        break

      default:
        break
    }

    return Promise.reject(error)
  }
)

export default axiosSetup
