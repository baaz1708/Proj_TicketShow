<template>
  <div class="container mt-5">
      <div class="col-12">
        <label for="timings" class="form-label">Timings</label><br>
        <span v-for="n in timings" :key="n">
            <input type="checkbox" class="btn-check" :id="n" autocomplete="off">
            <label class="btn btn-outline-success mx-2" :for="n">{{n}}</label>
        </span>
        
        <div v-for="(timing, index) in selectedTimings" :key="'selected'+ index" class="badge bg-primary m-1">
          {{ timing }}
          <span class="badge bg-danger ms-1" @click="removeTiming(index)">X</span>
        </div>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            timings:["9am-12pm","2pm-5pm","7pm-10pm","12am-3am"],
            id:"",
            selectedTimings:[]
        }
    },
//use combination of created and data whenever you need to access the route query params for page u'r navingating to
    created(){
        this.id = this.$route.params.id   
    }
}
</script>

<style>

</style>