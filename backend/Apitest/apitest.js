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
    getCity() {
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

// const registeration_data = {
//     "username": "baaz",
//     "email": "normal@mail.com",
//     "password": "homepass",
  
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

// methods.getCities()
// .then(response => {
//   console.log('response from eventservice cities', response.data)
// }).catch(err =>{
//   console.log('err from eventservice cities', err)
// })

// methods.getVenues()
// .then(response => {
//   console.log('response from eventservice venues', response.data)
// }).catch(err =>{
//   console.log('err from eventservice venues', err)
// })

// const venue_data = {
//   "id" : 5,
//   "name" : "Vrikutmpalam",
//   "city_id" : 4,
//   "capacity" : 500
// }

// methods.postVenue(venue_data)
// .then(response => {
//   console.log('response from eventservice venue', response.data)
// }).catch(err =>{
//   console.log('err from eventservice venue', err)
// })

// methods.updateVenue(venue_data)
// .then(response =>{
//   console.log('response from eventservice veneu', response.data)
// }).catch(err =>{
//   console.log('err from eventservice venue', err)
// })

// const id = 6
// methods.deleteVenue(id)
// .then(response => {
//   console.log('response from eventservice delete venue', response.data)
// }).catch(err =>{
//   console.log('err from eventservice delete venue', err)
// })

// const show_data = {
//   "name": "Blotus",
//   "cover_image": "https://i.pinimg.com/originals/f0/8e/88/f08e880aa19d31e32de422a562b66c79.jpg",
//   "ratings": 5,
//   "price": 150,
//   "selected_timings": {
//     "morning": true,
//     "noon": true,
//     "evening": false,
//     "night": false
//   },
//   "till_date": "2023-09-29T11:08:00.000Z",
//   "selected_tags": [
//     "action",
//     "suspense",
//     "comedy"
//   ],
//   "venue_id":5
// }

// methods.postShow(show_data)
// .then(response => {
//   console.log('response from eventservice show', response.data)
// }).catch(err =>{
//   console.log('err from eventservice show', err)
// })
// const id = 9
// methods.getShow(id)
// .then(response => {
//   console.log('response from eventservice show', response.data)
// }).catch(err =>{
//   console.log('err from eventservice show', err)
// })

// methods.editShow(19, show_data)
// .then(response => {
//   console.log('response from eventservice show', response.data)
// }).catch(err =>{
//   console.log('err from eventservice show', err)
// })

// const id = 13
// methods.deleteShow(id)
// .then(response => {
//   console.log('response from eventservice show', response.data)
// }).catch(err =>{
//   console.log('err from eventservice show', err)
// })

// const id = 2
// methods.getCity(id)
// .then(response => {
//   console.log('response from eventservice city', response.data)
// }).catch(err =>{
//   console.log('err from eventservice city', err)
// })

// const booking_data = {
//   "show_id": 2,
//   "user_id": 2,
//   "booked_date": "2023-09-21T19:18:00.000Z",
//   "booked_slots": {
//     "morning": 0,
//     "noon": 0,
//     "evening": 3,
//     "night": 0
//   }
// }

// methods.postBooking(booking_data)
// .then(response => {
//   console.log('response from eventservice booking', response.data)
// }).catch(err =>{
//   console.log('err from eventservice booking', err)
// })

// const id=6
// methods.getUser(id)
// .then(response => {
//   console.log('response from eventservice user', response.data)
// })

