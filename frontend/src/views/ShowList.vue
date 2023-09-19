<template>
  <div >
    <h2 class="mt-2"><span class=" badge bg-secondary">Shows in {{ venueCity }}</span></h2>
    <div v-for="venue in venues" :key="venue.id" class="movie-list p-2">
      <h2 class="myfont mt-5 mb-3 bg-success bg-opacity-10 border-bottom border-success">{{ venue.name }}</h2>
      <div class="movie-list-container ">
        <div class="card mx-1" v-for="show in filteredShows(venue.shows)" :key="show.name"  >
          <img :src="show.cover_image" class="card-img-top" :alt="show.name" />
          <div class="card-body bg-success bg-opacity-10">
            <h5 class="card-title">{{ show.name }}</h5>
            <div class="d-flex justify-content-end">
                <span v-for="(star, index) in 5" :key="index" >
                    <i class="bi star" :class="{ 'bi-star-fill': index < show.ratings, 'bi-star': index >= show.ratings }"></i>
                </span>
            </div>
                <!-- <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> -->
            <div class=" d-flex flex-wrap align-items-start my-1"><span v-for="tag in show.selected_tags" :key="tag" class="badge bg-secondary bg-opacity-10  text-bg-light mx-1">{{ tag }}</span></div>
            <router-link :to="{name : 'bookshow', params:{id : show.name} }" class="btn -fill-gradient mt-2">Book show </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store'

function getVenuesByCity(routeTo,next){
    const city_id = routeTo.params.city_id;
    console.log('routeTo.params.city_name=',routeTo.params.city_id)
    store.dispatch('city_list/fetchCity',{
      city_id : city_id
    }).then(() => {
        next()
    })
}

export default {
  beforeRouteEnter(routeTo,routeFrom,next){
        getVenuesByCity(routeTo,next)
        },
    beforeRouteUpdate(routeTo,routeFrom,next){
        getVenuesByCity(routeTo,next)
    },

  data() {
    return {
    }
  },

  methods: {
    filteredShows(shows){
      return shows.filter(show => new Date(show.till_date) > new Date());
    }
  },

  computed: {
    venues(){
      return store.state.city_list.city.venues
    },

    venueCity(){
      return store.state.city_list.city.name
    },

    
  }
}
</script>

<style scoped>
.movie-list {
  width: 100%;
}

.movie-list-container {
  overflow-x: auto;
  white-space: nowrap;
}

.movie-list-container .card {
  display: inline-block;
  width: 15rem;
}

.myfont{
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
}

.rating {
  color: #f5c518;
}

.headingfont{
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
</style>
