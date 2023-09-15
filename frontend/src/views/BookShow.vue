<template>
  <div class="container border border-3 rounded bg-success bg-opacity-10 my-4 p-2 ">
    <h3 class="headfont mb-5"> Book Tickets for show <span class="badge bg-warning">{{ show.name }}</span></h3>
      <div class="row g-5">
            <div class="col-12">
                <label for="dateinput" class="form-label mb-0">Book Show on Date</label>
                <VueDatePicker :enable-time-picker="false" :disabled-dates="disabledDates" v-model="booked_date" id="dateinput" placeholder="Select Date" />
            </div>
            <div class="col-12">
                <label for="slot" class="form-label"> Select  slot  and  input  No.  of  Tickets</label>
                <div class="row" id="slot">
                    <div class="col-sm-6" v-for="(ttag,time) in slots" :key="time">
                        <div class="input-group mb-3" >
                            <div class="input-group-text">
                                <label class="form-check-label badge bg-secondary rounded-pill me-2" :for="time">{{ ttag }}</label>
                                <input class="form-check-input mt-0 border-2" type="checkbox" :value="time"  :id="time" aria-label="Checkbox for following text input"  v-model="checkstatus" v-bind:disabled="!show.selected_timings[time]">
                            </div>
                            <input type="number" min="1" max="350" @input="bookSlots(time, $event.target.value)" class="form-control" aria-label="Text input with checkbox" :placeholder="show.selected_timings[time] ? 'No. of Tickets' : 'Housefull' " v-bind:disabled="!show.selected_timings[time]" > <!--v-model.lazy="booked_slots[time]" if want binding only when input changes focus -->
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12">
                <button type="button" class="btn -fill-gradient" @click="buyTickets" :class="{ disabled : !booked_date || !checkstatus.length }">Buy Tickets</button>
            </div>
       </div>
            <p v-for="error in errors " :key="error" class="errorMessage">{{ error }}</p>
  </div>
</template>

<script>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import store from '@/store'

function getShowById(routeTo,next){
    const id = routeTo.params.id;
        store.dispatch('shows/getShow',{id : id})  //can't put directly here id: this.$route.params.id because beforeRoute function can't access this.
        .then(() => {
        next()
    })
}

export default {
    components: {VueDatePicker},

    beforeRouteEnter(routeTo,routeFrom,next){   // parameters should be in exactly this form , must to include routeTo, routeFrom 
        getShowById(routeTo,next)  // even not used but important to use the next function in different function scope like above
    },
    beforeRouteUpdate(routeTo,routeFrom,next){
        getShowById(routeTo,next)
    },
    data(){
        return{
            slots:{
                "morning": "9am-12pm",
                "noon": "2pm-5pm",
                "evening": "7pm-10pm",
                "night": "12am-3am"
            },
            booked_slots:{
                "morning":0,
                "noon":0,
                "evening":0,
                "night":0
            },
            booked_date:null,
            checkstatus:[],
            errors:[]
        }
    },

    computed:{
        show(){
            return this.$store.state.shows.show
        },

        disabledDates() {
        let today = new Date();
        console.log('today',today)
        today.setHours(0, 0, 0, 0);  // set time to 00:00:00.000
        let disabledDate = new Date(this.show.till_date)
        console.log('disable', disabledDate)
        return date => date < today || date > disabledDate;
        }
    },

    methods:{
        bookSlots(time, value){
            value= Number(value);
            if( this.checkstatus.includes(time)){
                this.booked_slots[time] = value;
            }
        },

        buyTickets(){
            if(Object.values(this.booked_slots).every(value => value === 0)){
                this.errors.push('Please select atleast 1 ticket from any slot to book a show.')
            } else {
                let user = JSON.parse(localStorage.getItem('user'));
                console.log('user',user);
                let user_id = user.id;
                console.log('userid',user_id)
                this.$store.dispatch('bookings/addBooking', {
                    show_id: this.show.id,
                    user_id: user_id,
                    booked_date: this.booked_date,
                    booked_slots: this.booked_slots
                })
                .then(() => {
                    this.$router.push({name : 'bookedtickets', params: { id: user_id }})
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

}
</script>

<style>
.headfont{
    font-variant: small-caps;
}
</style>