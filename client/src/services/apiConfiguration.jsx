import Axios from 'axios'

const JwtToken = localStorage.getItem('token') || null

let apiUrl

const apiUrls = {
  production: 'https://spelling-bee-clone-backend.herokuapp.com/api',
  development: 'https://localhost:3000/api'
}

if (window.location.hostname === 'localhost') {
  apiUrl = apiUrls.development
} else {
  apiUrl = apiUrls.production
}

const api = Axios.create({
  baseURL: apiUrl,
  headers: {
    Authorization: `Bearer ${JwtToken}`,
    'Access-Control-Allow-Origin': '*'
  }
})

export default api