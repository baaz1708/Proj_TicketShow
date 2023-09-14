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
      const post_show_res = await apiClient.post('/shows/', show_data)
      const response = await apiClient.get(`/venues/${venue_id}`);
      const venue = response.data;
      venue.shows.push(show_data);
      return apiClient.put(`/venues/${venue_id}`, venue )
     
    },
  //   async getShow(venue_id, show_id){
  //     const response = await apiClient.get(`/venues/${venue_id}`);
  //     const venue = response.data;
  //     const show = venue.shows.find(show => show.id === show_id);
  //     return show;
  // },
   getShow(venue_id, show_id){
    return apiClient.get('/shows/' + show_id )
   },

   async editShow(venue_id,show_id, show_data){
    const response = await apiClient.get(`/venues/${venue_id}`);
    const venue = response.data;
    const showIndex = venue.shows.findIndex(show => show.id === show_id);
    if (showIndex !== -1){
      venue.shows[showIndex] = show_data;
    }
    const _noneed = await apiClient.put(`/venues/${venue_id}`, venue);
    return apiClient.put(`/shows/${show_id}`, show_data)

   }

}