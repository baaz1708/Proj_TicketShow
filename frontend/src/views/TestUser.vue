<template>
  <div class="container mt-5">
      <div class="col-12">
          <label for="dateinput" class="form-label mb-0">Show continue's till Date</label>
          <VueDatePicker :enable-time-picker="false" :disabled-dates="disabledDates" v-model="till_date" placeholder="Select Date" id="dateinput"/>
      </div>
  </div>
</template>

<script>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
export default {
    components: {VueDatePicker},
    data(){
        return{
            timings:["9am-12pm","2pm-5pm","7pm-10pm","12am-3am"],
            id:"",
            selectedTimings:[],
            till_date:null,
            // disabledDates:['2023-10-25', '2023-10-26'].map(dateString => new Date(dateString))
            disabledDate : new Date('2023-09-20T10:47:00.000Z')
        }
    },
//use combination of created and data whenever you need to access the route query params for page u'r navingating to
    created(){
        this.id = this.$route.params.id   
    },

    computed: {
        disabledDates() {
        let today = new Date();
        today.setHours(0, 0, 0, 0);  // set time to 00:00:00.000
        return date => date < today || date > this.disabledDate;
        }
    }
}
</script>

<style>

</style>