<template>
  <div class="container m-5">
    <div class="input-group mb-3">
        <span class="input-group-text" id="city">🌐</span>
        <input type="text" class="form-control" placeholder="Search City to Locate shows" aria-label="City" aria-describedby="city" v-model="search">
    </div>
    <div class="list-group">
        <router-link :to="{name : 'showlist', params:{city_id : city.id } }" class="list-group-item list-group-item-action" v-for="city in filtered_list" :key="city.id">{{ city.name }}</router-link>
    </div>
  </div>
</template>

<script>
import store from '@/store'
function getcitylist(routeTo,next){
    store.dispatch('city_list/fetchCities',{
    }).then(() => {
        next()
    })
}

export default {
    data() {
        return {
            search: ''
        }
    },
    methods:{

    },
    beforeRouteEnter(routeTo,routeFrom,next){   // parameters should be in exactly this form , must to include routeTo, routeFrom 
        getcitylist(routeTo,next)  // even not used but important to use the next function in different function scope like above
    },
    beforeRouteUpdate(routeTo,routeFrom,next){
        getcitylist(routeTo,next)
    },
    computed:{
        city_list(){
            return this.$store.state.city_list.cities
        },
        filtered_list(){
            if (this.search === ''){
                return [];
            }
            return this.city_list.filter((city) =>
                city.name.toLowerCase().includes(this.search.toLowerCase())
            );
        }
    }
}
</script>

<style>

</style>