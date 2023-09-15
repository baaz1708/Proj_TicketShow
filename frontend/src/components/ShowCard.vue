<template>
    <div class="card " >
        <img :src="show.cover_image" class="card-img-top" alt="...">
        <div class="card-body ">
            <h5 class="card-title text-capitalize  fw-semibold">{{ show.name }} <span class="ms-5 badge bg-info">${{show.price}}</span> </h5>
                <div class="d-flex justify-content-end">
                    <span v-for="(star, index) in 5" :key="index" >
                        <i class="bi star" :class="{ 'bi-star-fill': index < show.ratings, 'bi-star': index >= show.ratings }"></i>
                    </span>
                </div>
                <!-- <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> -->
                <div class="mt-3"><span v-for="tag in show.selected_tags" :key="tag" class="badge text-bg-light mx-1">{{ tag }}</span></div>
            <div class="d-flex justify-content-between">
                <router-link :to="{ name: 'editshow', params:{id: show.id}, query:{venue_id: venue_id} }" class="btn btn-success  btn-sm mt-3">Edit Show</router-link>
                <button type="button" class="btn btn-outline-danger btn-sm mt-3" @click="$emit('delete-show', show.id)">Delete Show</button>
                
                <!-- Modal -->
                <!-- <div class="modal fade" :id="'deleteModal' + show.id" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="deleteModalLabel">Sure! want to delete the show?</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-outline-secondary btn-sm" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-danger btn-sm" @click="$emit('delete-show', show.id)">Delete Show</button>
                        </div>
                        </div>
                    </div>
                </div> -->
            </div>
        </div>
    </div>
</template>

<script>
// import { Modal } from 'bootstrap'
export default {
    props:{
        show:{
            type: Object,
            required: true,
        },
        venue_id:{
            type: String,
            required: true
        }
    },

    // mounted(){
    //     this.$nextTick(() => {
    //         new Modal(document.getElementById('deleteModal' + this.show.id));
    //     });
    // }

}
</script>

<style>
.star{
    color:rgb(223, 223, 0);
}

</style>