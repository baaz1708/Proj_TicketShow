<template>
    <div class="card " >
        <img :src="show.cover_image" class="card-img-top" alt="...">
        <div class="card-body ">
            <h5 class="card-title text-capitalize  fw-semibold">{{ show.name }}</h5>
                <div class="d-flex justify-content-end">
                    <span v-for="(star, index) in 5" :key="index" >
                        <i class="bi star" :class="{ 'bi-star-fill': index < show.ratings, 'bi-star': index >= show.ratings }"></i>
                    </span>
                </div>
                <!-- <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> -->
                <div class="mt-3"><span v-for="tag in show.selected_tags" :key="tag" class="badge text-bg-light mx-1">{{ tag }}</span></div>
            <div class="d-flex justify-content-between">
                <a href="#" class="btn btn-success  btn-sm mt-3">Edit Show</a>
                <a href="#" class="btn btn-outline-danger btn-sm mt-3">Delete Show</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        show:{
            type: Object,
            required: true,
        }
    }

}
</script>

<style>
.star{
    color:rgb(223, 223, 0);
}

</style>