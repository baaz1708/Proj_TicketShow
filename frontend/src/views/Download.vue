<template>
  <div class="container p-5">
    <div v-for="venue in venues" :key="venue">
      <button class="btn m-3 btn-lg -fill-gradient shadow " @click="download(venue)">Download⬇️ {{ venue }}.csv 🗃️</button>
    </div>

  </div>
</template>

<script>
import {apiClient} from  '@/services/event_services.js'
import store from '@/store'


function trigger_export(routeTo,next){
    store.dispatch('venues/export')
    .then(() =>{
        next()
    })
}

export default {

    beforeRouteEnter(routeTo,routeFrom,next){
        trigger_export(routeTo,next)
    },
    beforeRouteUpdate(routeTo,routeFrom,next){
        trigger_export(routeTo,next)
    },

    computed:{
        venues(){
            return store.state.venues.venuenames
        }

    },

    methods:{
        download(venue){
            apiClient({
                url: `/download/${venue}`,
                method: 'GET',
                responseType: 'blob', // Important for creating a downloadable file
            }).then(response => {
                    if (response.headers['content-type'] === 'application/json') {
                    // The response contains a JSON error message
                    return response.data.text().then(text => {
                        const errorMessage = JSON.parse(text);
                        console.error(errorMessage);
                    });
                    } else {
                    // The response contains file data
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', `${venue}.csv`);
                    document.body.appendChild(link);
                    link.click();
                    }
                })
                .catch(error => {
                console.error(error);
                });
            },
        }

}
</script>

<style>

</style>