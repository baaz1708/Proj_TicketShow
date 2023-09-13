<template>
  <div class="container border border-3 rounded bg-success bg-opacity-10 my-4 p-3">
      <form class="row g-5" @submit.prevent="addShow">
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
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import {useVuelidate} from '@vuelidate/core'
import {required} from '@vuelidate/validators'

export default {
    components: {VueDatePicker},
    setup(){
        return { v$: useVuelidate() }
    },
    data(){
        return {
            name:"",
            cover_image:"",
            till_date: null,
            ratings:"",
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
            selected_timings: {required},
            till_date: {required}
        }
    },

    methods:{
        removeTiming(selected) {
            console.log('Removing',selected)
            this.selected_timings[selected] = false;
        },
        addShow(){
            console.log('before adding show ', this.name)
            this.$store.dispatch('shows/addShow', {
                venue_id: this.$route.params.id,
                name: this.name,
                city: this.$route.query.city,
                cover_image: this.cover_image,
                ratings: this.ratings,
                selected_timings: this.selected_timings,
                till_date: this.till_date,
                date_added:"05/02/2002",
                selected_tags: this.selected_tags,
                bookings:{
                    "morning":"0",
                    "noon":"0",
                    "evening":"0",
                    "night":"0"
                    }     
            }).then(() =>{
                this.$router.push({ name : 'venuecrud'})
            }).catch((err) =>{
                    console.log('got error during posting shows', err)
                    if (err.response && err.response.data && err.response.data.message){
                    this.errors.push(err.response.data.message);
                    } else {
                        this.errors.push('Something went wrong. Please try again later.');
                    }
                })
        }
    },

    computed:{
        filtered_timings() {
            return Object.keys(this.selected_timings).filter(time => 
            this.selected_timings[time]);
        }
    }
}
</script>

<style>
.form-label{
    font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
}
.arrow{
    cursor: pointer;
}
</style>