<template>
  <div>
      <div class="accordion m-3" id="accordionExample">
        <div class="accordion-item">
            <p class="accordion-header">
            <button class="accordion-button " type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                <p class="fw-bold text-success "><em>Venue Details</em></p>
            </button>
            </p>
            <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample" ref="collapsible">
            <div class="accordion-body">
               <div class="row">
                    <div class="col-6">
                        <form class="row g-3" @submit.prevent="updateVenue">
                            <div class="col-12">
                                <label for="venueName" class="form-label">Venue name</label>
                                <input type="text" v-model="Venuename" class="form-control" id="venueName" >
                            </div>
                            <div class="col-md-6">
                                <label for="capacity" class="form-label">capacity</label>
                                <input type="text" v-model="Capacity" class="form-control" id="capacity">
                            </div>
                            <div class="col-md-4">
                                <label for="city" class="form-label">City</label>
                                <select id="city" v-model="Cityname" class="form-select">
                                <option selected>{{ Cityname }}</option>
                                <option v-for="city in citylist" :key="city.id">{{ city.cityname }}</option>
                                </select>
                            </div>
                            <div class="col-12">
                                <button type="submit" class="btn -fill-gradient" >Save changes</button>
                            </div>
                        </form>
                    </div>
                    <div class="col-6 border-start border-3">
                        <u><strong>Delete this venue</strong></u>
                        <div class="row g-3 mt-3 ">
                            <div class="col-12 alert alert-warning mx-1"><code>After clicking this button all your venue data including the shows will be Deleted , are you sure you want to delete it?</code></div>
                            <div class="col-12">
                                <button class="btn btn-danger" @click="deleteVenue">Delete</button>
                            </div>
                        </div>
                    </div>
               </div>
            </div>
            </div>
        </div>
      </div>
      <div class="container my-5 ">
            <div class="mt-2" style="right: 0 ; display: flex; justify-content: flex-end;">
                <input type="text" placeholder="Search shows ..." v-model="search" class="form-control"> <!--style="margin-right: 10px;"-->
                <select v-model="filter" class="select me-2 rounded bg-light" aria-label="Search by">
                    <option value="tag"> By Tag</option>
                    <option value="timing"> By Timing</option>
                    <option value="name"> By Name </option>
                </select>
            </div>
            <router-link :to="{name:'addonshow', params:{id:id} , query:{city:Cityname} }"  v-if="Shows.length != 0" class=" btn btn-lg normbtn  -fill-gradient  mt-4 mb-5 "> ᴀᴅᴅᴏɴ ꜱʜᴏᴡ 📽️</router-link>
            <div v-if="Shows.length != 0" class="row row-cols-1 row-cols-md-4 g-4">
                <div class="" v-for="show in filtered_shows" :key="show.id">
                    <ShowCard  :show="show" :venue_id="this.$route.params.id"/>
                </div>
            </div>
            <div v-else class="row m-4">
                <h5>Currently you don't have any shows added , click button below to add Show ⤵️</h5>
                <router-link  class=" btn -fill-gradient mt-3" :to="{name: 'addonshow' , params:{id:id } }" > ᴀᴅᴅᴏɴ ꜱʜᴏᴡ</router-link>
            </div>
      </div>
  </div>
</template>

<script>
import { Collapse } from 'bootstrap';
import ShowCard from '../components/ShowCard.vue'
import store from '@/store'

function getcitylist_and_venueById(routeTo,next){
    const id = routeTo.params.id;
    Promise.all([
        store.dispatch('city_list/fetchCities'),
        store.dispatch('venues/fetchVenueById',{id : id})  //can't put directly here id: this.$route.params.id because beforeRoute function can't access this.
    ]).then(() => {
        next()
    })
}
export default {
    components: {ShowCard},

    data(){
            return {
                search: "",
                filter: "",

                id:"",
                Venuename:"",
                Capacity: "",
                Cityname: "",
                Shows:[],
                errors: []
            }
        },
    beforeRouteEnter(routeTo,routeFrom,next){   // parameters should be in exactly this form , must to include routeTo, routeFrom 
    getcitylist_and_venueById(routeTo,next)  // even not used but important to use the next function in different function scope like above
    },
    beforeRouteUpdate(routeTo,routeFrom,next){
        getcitylist_and_venueById(routeTo,next)
    },

    created(){
        this.id = this.$route.params.id
        this.Venuename = store.state.venues.venue.name
        this.Capacity = store.state.venues.venue.capacity
        this.Cityname = store.state.venues.venue.city
        this.Shows = store.state.venues.venue.shows
    },

    computed:{
        citylist(){
            return this.$store.state.city_list.cities
        },
        shows_list(){
            return this.$store.state.venues.venue.shows
        },
        filtered_shows(){
            if (this.search === ''){
                return this.shows_list;
            } else {
                if (this.filter === 'tag'){
                    return this.shows_list.filter((show) =>
                    show.selected_tags.some(tag => 
                    tag.toLowerCase().includes(this.search.toLowerCase()))
                    );
                } else if (this.filter === 'timing') {
                    return this.shows_list.filter((show) =>
                    Object.entries(show.selected_timings).some(([key, value]) =>
                    value === true && key.toLowerCase().includes(this.search.toLowerCase())
                    ));
                } else if (this.filter === 'name') {
                    return this.shows_list.filter((show) =>
                    show.name.toLowerCase().includes(this.search.toLowerCase()))
                }
            }
        }
    },

    methods:{
        updateVenue(){
            console.log('Before action updateVenue', this.Venuename)
            this.$store.dispatch('venues/updateVenue' , {
                    id: this.$route.params.id,
                    name: this.Venuename,
                    city: this.Cityname,
                    capacity: this.Capacity,
                    dataadded: '05/02/2022',
                    shows:[]
            }).then(() =>{
                console.log('done with venue changes');
                let collapsible = this.$refs.collapsible;
                new Collapse(collapsible).hide();
            }).catch((err) =>{
                console.log('something got wrong' , err)
                if (err.response && err.response.data && err.response.data.message){
                        this.errors.push(err.response.data.message);
                        } else {
                            this.errors.push('Something went wrong. Please try again later.');
                        }
            })
        },
        deleteVenue(){
            console.log('Before Delete venue' , this.$route.params.id)
            this.$store.dispatch('venues/deleteVenue',{id: this.$route.params.id})
            .then(() =>{
                this.$router.push({name: 'addshow'})
            }).catch(err => {
                console.log('There was some in deleting venues', err)
            })
        }
    }
}
</script>

<style>

</style>