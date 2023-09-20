<template>
  <div class="container p-3">
    <div class="row">
      <div class="col-md-6">
        <h2>User Information</h2>
        <p><strong>Username:</strong> {{ user.username }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
      </div>
      <div class="col-md-6 border-start border-3">
        <h2 class="">Bookings</h2>
        <div class="list-group">
          <div class="list-group-item badge bg-info-subtle text-emphasis-info mb-1" v-for="booking in user.bookings" :key="booking.id">
            <h5 class="mb-1">Booking ID: {{ booking.id }}</h5>
            <p class="mb-1"><strong>Show ID:</strong> {{ booking.show_id }}</p>
            <span>Booked Slots{{ bookedSlots }}</span>
            <p class="mb-1"><strong>Booked Date:</strong> {{ booking.booked_date }}</p>
            <!-- Add more booking details here -->
          </div>
        </div>       
      </div>
    </div>
    <div class="row mt-5">
      <h2>User Statistics</h2>
        <!-- Add your user statistics here -->
    </div>
      <router-link :to="{ name: 'addshow' }" class="btn btn-primary mt-3 px-3 mx-auto">Back to Home</router-link>
  </div>
</template>

<script>
import store from '@/store'

function getUser(routeTo,next){
    const id = routeTo.params.id;
    console.log('routeTo.params.user_id=',id)
    store.dispatch('user_auth/fetchUser',{
      id : id
    }).then(() => {
        next()
    })
}
export default {
  beforeRouteEnter(routeTo,routeFrom,next){
    getUser(routeTo,next)
    },
  beforeRouteUpdate(routeTo,routeFrom,next){
    getUser(routeTo,next)
  },

  computed: {
    user(){
      return this.$store.state.user_auth.user
    },
    bookedSlots(){
      return 2
    }
  }

}
</script>

<style>

</style>