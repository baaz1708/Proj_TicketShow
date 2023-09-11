<template>
    <div>
        <div class="mt-2" style="right: 0 ; display: flex; justify-content: flex-end;">
          <input type="text" placeholder="Search venues ..." v-model="search" class="me-2 rounded"> <!--style="margin-right: 10px;"-->
          <select v-model="filter" class="select me-2 rounded bg-light" aria-label="Search by">
            <option value="city"> by City</option>
            <option value="name">by Name</option>
          </select>
        </div>
        <div class="container ">
            <router-link to="addvenue"  class=" btn btn-lg normbtn  -fill-gradient  mt-4 mb-5 "> Add Venue 📽️</router-link>
            <div v-if="venues.length != 0" class="row m-4">
                <VenueCard v-for="venue in filtered_venues" :key="venue.id" :venue="venue" />
            </div>
            <div v-else class="row m-4">
                <h5>Currently you don't have any venue added , click button below to add venue ⤵️</h5>
                <router-link to="addvenue" class=" btn -fill-gradient mt-3"> Add Venue</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import VenueCard from '../components/VenueCard.vue'
import store from '@/store'
function getvenues(routeTo,next){
    store.dispatch('venues/fetchVenues',{
    }).then(() => {
        next()
    })
}

export default {
  components: { VenueCard },
    data () {
        return {
            search: '',
            filter: ''
                }
        },
    beforeRouteEnter(routeTo,routeFrom,next){
        getvenues(routeTo,next)
        },
    beforeRouteUpdate(routeTo,routeFrom,next){
        getvenues(routeTo,next)
    },
    created(){
        this.venues = store.state.venues.venues
    },

    computed:{
        venues_list(){
            return this.$store.state.venues.venues
        },
        filtered_venues(){
            if (this.search === ''){
                return this.venues_list;
            } else {
                if (this.filter === 'city'){
                    return this.venues_list.filter((venue) =>
                    venue.city.toLowerCase().includes(this.search.toLowerCase()));
                }
                return this.venues_list.filter((venue) =>
                venue.name.toLowerCase().includes(this.search.toLowerCase()))
            }
        }
    }

}
</script>

<style>
.normbtn{
    transition: 0.1s;
    display: inline-block;
    width: auto;
    padding:0.375rem 0.75rem;
}
.normbtn:hover{
    transform: scale(1.05);
}
</style>