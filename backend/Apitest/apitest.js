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

const methods = {
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
    async postShow(show_data){
      return apiClient.post('/shows/', show_data)
      // const response = await apiClient.get(`/venues/${venue_id}`);
      // const venue = response.data;
      // venue.shows.push(show_data);
      // return apiClient.put(`/venues/${venue_id}`, venue )
     
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

   },

   async deleteShow(show_id, venue_id){
    const response = await apiClient.get(`/venues/${venue_id}`);
    const venue = response.data;
    const showIndex = venue.shows.findIndex(show => show.id === show_id);
    if (showIndex !== -1){
      venue.shows.splice(showIndex, 1);
    }
    const _noneed = apiClient.put(`/venues/${venue_id}`, venue);
    return apiClient.delete(`/shows/${show_id}`)
  },

  getVenuesByCity(city_name){
    return apiClient.get('/venues').then(response =>{
      console.log('response from eventservice city filter', response)
      const venues = response.data.filter(venue => venue.city.toLowerCase() === city_name.toLowerCase());
      return venues
    })
  },
  getUserShow(show_id){
    return apiClient.get('/shows/' + show_id )
   },

   postBooking(booking_data){
    return apiClient.post('bookings', booking_data)
   }
}

// const registeration_data = {
//     "username": "vikram",
//     "email": "vikram@gmail.com",
//     "password": "0283456",
  
// }
// methods.postRegistration(registeration_data)
// .then(response => {
//     console.log('response from eventservice registration', response.data)
// }).catch(err =>{
//     console.log('err from eventservice registration', err)
// })

// const login_data ={
//     "email": "vikram@gmail.com",
//     "password": "0283456"
// }
// methods.postLogin(login_data)
// .then(response => {
//     console.log('response from eventservice login', response.data)
// }).catch(err =>{
//     console.log('err from eventservice login', err)
// })

methods.getCities()
.then(response => {
  console.log('response from eventservice cities', response.data)
}).catch(err =>{
  console.log('err from eventservice cities', err)
})
