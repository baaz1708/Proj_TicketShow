import axios from 'axios'

const apiClient = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: false,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    },
    timeout: 10000
})

export default {

    addtoken(token) {
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
      console.log('apiclient header token added',apiClient.defaults.headers.common['Authorization'])
    },
    postRegistration(registration) {
        return apiClient.post('/register', registration)
      },
    postLogin(login_user) {
      return apiClient.post('/login', login_user)
    },
    getCities() {
      return apiClient.get('/cities')
    },
    getCity(id) {
      return apiClient.get('/cities/' + id)
    },
    getVenues(){
      return apiClient.get('/venues')
    },
    postVenue(venue_data){
      return apiClient.post('/venues', venue_data)
    },
    getVenue(id){
      return apiClient.get('/venues/' + id)
    },
    updateVenue(venue_data){
      return apiClient.put('/venues/' + venue_data.id, venue_data)
    },
    deleteVenue(id){
      return apiClient.delete('/venues/' + id)
    },
    postShow(show_data){
      return apiClient.post('/shows', show_data)
    },
    getShow( show_id){
      return apiClient.get('/shows/' + show_id )
    },

    editShow(show_id, show_data){
      return apiClient.put(`/shows/${show_id}`, show_data)
    },

    deleteShow(show_id){
      return apiClient.delete(`/shows/${show_id}`)
    },

    getUserShow(show_id){
      return apiClient.get('/shows/' + show_id )
    },

    postBooking(booking_data){
      return apiClient.post('/bookings', booking_data)
    },
    getUser(id){
      return apiClient.get('/users/' + id)
    }
}