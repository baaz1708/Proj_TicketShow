<template>
    <div>
        <router-link :to="{ name: 'venuecrud' , params:{ id: venue.id} }" class="col-lg-4 lnk">
            <div class="card text-center shadow mx-2 mb-5" >
                <div class="card-header dancefont">
                    Venue ~ 🎞️{{ venue.name }}
                </div>
                <div class="card-body">
                    <h5 class="card-title">{{ venue.city }}</h5>
                    <div class="d-flex justify-content-between">
                        <p class="card-text">Running Shows 🔛 <em class="rounded badge bg-success">{{ venue.shows.length }}</em></p>
                        <p class="card-text">Capacity 🔛 <em class="rounded badge bg-success">{{ venue.capacity }}</em></p>
                        <span>
                            <button type="button" class="btn btn-outline-info btn-sm" > Enter</button>
                        </span>
                    </div>
                </div>
                <div class="card-footer text-body-secondary">
                    {{ venue.dateadded }}
                </div>
            </div>
        </router-link>
    </div>
</template>

<script>

export default {
    props:{
        venue:{
            type: Object,
            required: true,
        }
    },
    methods: {

    }

}
</script>

<style>
.card{
    transition: transform 0.3s;
}

.card:hover {
    transform: scale(1.05);
    cursor: pointer
}

.dancefont{
    font-family:fantasy
}

/* we can also apply style to the tags like router-link to prevent its default behaviour without putiing . in front */
/* router-link{
    text-decoration: none !important;
    color: inherit !important;
}
router-link:hover {
    text-decoration: none !important;
} */

.lnk{
    text-decoration: none !important;
    color: inherit !important;
}
.link:hover{
    text-decoration: none !important;
}
</style>