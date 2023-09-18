<template>
  <div class="container p-3">
      <form class="row g-3 mt-3" @submit.prevent="addVenue">
        <div class="col-md-6">
            <label for="Venuename" class="form-label">Venue's Name</label>
            <input type="text" id="Venuename" v-model="Venuename"  @blur="v$.Venuename.$touch()" class="form-control" :class=" { 'error': v$.Venuename.$error }" >
        </div>
        <div v-if="v$.Venuename.$error">
            <p class="errorMessage">Category is required</p>
        </div>


        <div class="col-md-6">
            <label for="Capacity" class="form-label">Capacity</label>
            <input type="text" id="Capacity" v-model="Capacity"  @blur="v$.Capacity.$touch()" class="form-control" :class=" { 'error': v$.Capacity.$error }" >
        </div>
        <div v-if="v$.Capacity.$error">
            <p class="errorMessage">Category is required</p>
        </div>


        <div class="col-md-4">
            <label for="Cityname" class="form-label">City</label>
            <select id="Cityname" v-model="Cityid"   @blur="v$.Cityid.$touch()" class="form-select { error: v$.Cityid.$error }">
            <option selected>Choose...</option>
            <option v-for="city in citylist" :key="city.id" :value="city.id">{{ city.cityname }}</option>
            </select>
        </div>
        <div v-if="v$.Cityid.$dirty && Cityid === 'Choose...' ">
            <p class="errorMessage">Category is required</p>
        </div>

        <div class="col-12">
            <button type="submit" class="btn -fill-gradient" :class="{ disabled : v$.$invalid}" >Add</button>
        </div>
      </form>

      <p v-for="error in errors " :key="error" class="errorMessage">{{ error }}</p>
  </div>
</template>

<script>
import {useVuelidate} from '@vuelidate/core'
import {required} from '@vuelidate/validators'
import store from '@/store'

function getcitylist(routeTo,next){
    store.dispatch('city_list/fetchCities',{
    }).then(() => {
        next()
    })
}
export default {
    setup(){
        return { v$: useVuelidate() }
    },

    data(){
        return {
            Venuename:"",
            Capacity: "",
            Cityid: "",
            errors: []
        }
    },
    validations(){
        return {
            Venuename: {required},
            Capacity: {required},
            Cityid: {required}
        }
    },

    methods:{
        addVenue(){
            if (this.Cityid != 'Choose...'){
                console.log('Before postvenue action data :', this.Venuename)
                this.$store.dispatch('venues/addVenue' , {
                    name: this.Venuename,
                    city_id: this.Cityid,
                    dateadded: '05/02/2023',
                    capacity: this.Capacity,
                    shows:[]
                }).then(() =>{
                    this.$router.push({name: 'addshow'})
                }).catch((err) =>{
                    console.log('got error during Posting venues', err)
                    if (err.response && err.response.data && err.response.data.message){
                    this.errors.push(err.response.data.message);
                    } else {
                        this.errors.push('Something went wrong. Please try again later.');
                    }
                })
            } else {
                console.log('Change City name  ')
            }
        }
    },

    beforeRouteEnter(routeTo,routeFrom,next){   // parameters should be in exactly this form , must to include routeTo, routeFrom 
        getcitylist(routeTo,next)  // even not used but important to use the next function in different function scope like above
    },
    beforeRouteUpdate(routeTo,routeFrom,next){
        getcitylist(routeTo,next)
    },

    computed:{
        citylist(){
            return this.$store.state.city_list.cities
        }
    }
}
</script>

<style>

</style>