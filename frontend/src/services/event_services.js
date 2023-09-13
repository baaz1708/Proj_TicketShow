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
    },
    getCities() {
      return apiClient.get('/cities')
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
    async postShow(venue_id, show_data){
      const response = await apiClient.get(`/venues/${venue_id}`);
      const venue = response.data;
      venue.shows.push(show_data);
      return apiClient.put(`/venues/${venue_id}`, venue )
    }
}