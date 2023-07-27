import axios from 'axios'

const apiClient = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: false,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    },
    timeout: 10000
})

export default{
    postRegistration(registration) {
        return apiClient.post('/register', registration)
      },
      postLogin(login_user) {
        return apiClient.post('/login', login_user)
      }
}