<template>
  <div class="container border border-3 rounded bg-success bg-opacity-10 my-4 p-3">
      <form class="row g-5" @submit.prevent="editShow">
      <div class="col-12">
        <label for="name" class="form-label" >Show Name</label>
        <input type="text" class="form-control" id="name" v-model="name" @blur="v$.name.$touch()">
      </div>
      <div v-if="v$.name.$error" class="my-0">
            <p class="errorMessage">Category is required</p>
      </div>

      <div class="col-12">
        <label for="coverImage" class="form-label">coverImage url:</label>
        <input type="text" class="form-control " id="coverImage"  v-model="cover_image" @blur="v$.cover_image.$touch()" placeholder="Paste your picture url here without quotes">
      </div>
      <div v-if="v$.cover_image.$error" class="my-0">
            <p class="errorMessage">Category is required</p>
        </div>

        <div class="col-12">
        <label for="price" class="form-label">Ticket price</label>
        <input type="text" class="form-control " id="price"  v-model="price" @blur="v$.price.$touch()" placeholder="Paste your picture url here without quotes">
      </div>
      <div v-if="v$.price.$error" class="my-0">
            <p class="errorMessage">Category is required</p>
        </div>

      <div class="col-12">
        <label for="ratings" class="form-label">Ratings</label>
        <select id="ratings" class="form-select text-align-center" v-model="ratings" @blur="v$.ratings.$touch()">
          <option v-for="n in 5" :key="n" :value="n">⭐ {{n}}</option>
        </select>
      </div>
      <div v-if="v$.ratings.$error" class="my-0">
            <p class="errorMessage">Category is required</p>
        </div>

      <div class="col-12">
        <label for="timings" class="form-label">Timings</label><br>
        <span v-for="(n,time) in timings" :key="time">
            <input type="checkbox" class="btn-check" :id="time" :value="time" v-model="selected_timings[time]" autocomplete="off">
            <label class="btn btn-outline-success shadow mx-2" :for="time">{{n}}</label>
        </span>
        
        <div v-for="(selected, time) in filtered_timings" :key="time"  class="badge bg-secondary mt-3 mx-2">
          {{ selected }}
          <span class="badge bg-danger ms-1 arrow" @click="removeTiming(selected)">X</span>
        </div>
      </div>

      <div class="col-12">
          <label for="dateinput" class="form-label mb-0">Show continue's till Date</label>
          <VueDatePicker v-model="till_date" @blur="v$.till_date.$touch()" id="dateinput"/>
      </div>
      <div v-if="v$.till_date.$error" class="my-0">
            <p class="errorMessage">Category is required</p>
        </div>

      <div class="col-12">
        <label for="tags" class="form-label" > Select Tags for this Show</label><br>
        <span v-for="(tag, index) in tags" :key="index">
            <input type="checkbox" class="btn-check" :id="index" :value="tag" v-model="selected_tags" autocomplete="off">
            <label  class="btn btn-outline-secondary btn-sm m-1" style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;" :for="index">{{ tag }}</label>
        </span>
      </div>

      <div class="col-12">
        <button type="submit" class="btn -fill-gradient" :class="{ disabled : v$.$invalid}">add show</button>
      </div>

      <p v-for="error in errors " :key="error" class="errorMessage">{{ error }}</p>

      </form>
  </div>
</template>

<script>
import store from '@/store'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import {useVuelidate} from '@vuelidate/core'
import {required} from '@vuelidate/validators'


function getshow(routeTo,next){
    const showID = routeTo.params.id
    const venueID = routeTo.query.venue_id
    store.dispatch('shows/fetchShow',{
        show_id : showID,
        venue_id: venueID
        })
    .then(() => {
        next()
    })
}
export default {
    components: {VueDatePicker},
    setup(){
        return { v$: useVuelidate() }
    },

    beforeRouteEnter(routeTo,routeFrom,next){   // parameters should be in exactly this form , must to include routeTo, routeFrom 
        getshow(routeTo,next)  // even not used but important to use the next function in different function scope like above
    },
    beforeRouteUpdate(routeTo,routeFrom,next){
        getshow(routeTo,next)
    },

    data(){
        return {
            name:"",
            cover_image:"",
            till_date: null,
            ratings:"",
            price:150,
            timings:{
                "morning": "9am-12pm",
                "noon": "2pm-5pm",
                "evening": "7pm-10pm",
                "night": "12am-3am"
            },
            selected_timings:{
                "morning": false,
                "noon": false,
                "evening": false,
                "night": false
            },
            tags:["thriller", "drama", "action","social message","social delima", "autobiography","scifi","romantic","love","gore","violence","nudity","comedy","humour","dark humours","suspense","taboo"],
            selected_tags:[],
            errors:[]
        }
    },

    validations(){
        return {
            name: {required},
            cover_image: {required},
            ratings: {required},
            price: {required},
            selected_timings: {required},
            till_date: {required}
        }
    },

    created(){
            this.name = store.state.shows.show.name,
            this.cover_image = store.state.shows.show.cover_image,
            this.till_date =  store.state.shows.show.till_date,
            this.ratings = store.state.shows.show.ratings,
            this.selected_timings = store.state.shows.show.selected_timings,
            this.selected_tags = store.state.shows.show.selected_tags
    },

    computed:{
        filtered_timings() {
            return Object.keys(this.selected_timings).filter(time => 
            this.selected_timings[time]);
        }
    },

    methods:{
        removeTiming(selected) {
            console.log('Removing',selected)
            this.selected_timings[selected] = false;
        },
        editShow(){
            console.log('before editing show ', this.name)
            let till_date = new Date(this.till_date)
            this.$store.dispatch('shows/editShow', {
                show_id: this.$store.state.shows.show.id,
                name: this.name,
                cover_image: this.cover_image,
                ratings: this.ratings,
                price: this.price,
                selected_timings: this.selected_timings,
                till_date: till_date,
                selected_tags: this.selected_tags,   
            }).then(() =>{
                let venue_id = this.$route.query.venue_id
                this.$router.push({ name : 'venuecrud', params:{id:venue_id}})
            }).catch((err) =>{
                    console.log('got error during posting shows', err)
                    if (err.response && err.response.data && err.response.data.message){
                    this.errors.push(err.response.data.message);
                    } else {
                        this.errors.push('Something went wrong. Please try again later.');
                    }
                })
        }
    }


}
</script>

<style>

</style>