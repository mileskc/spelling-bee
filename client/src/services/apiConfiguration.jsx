import Axios from 'axios'

const JwtToken = localStorage.getItem('token') || null

let apiUrl = "localhost:3000/api"

// const apiUrls = {
//   production: '',
//   development: 'localhost:3000/api'
// }

// if (window.location.hostname === 'localhost') {
//   apiUrl = apiUrls.development
// } else {
//   apiUrl = apiUrls.production
// }

const api = Axios.create({
  baseURL: apiUrl,
  headers: {
    Authorization: `Bearer ${JwtToken}`,
    'Access-Control-Allow-Origin': '*'
  }
})

export default api