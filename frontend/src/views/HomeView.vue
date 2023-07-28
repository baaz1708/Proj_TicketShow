<template>
  <div class="home">
    <carousel-bar msg="Latest shows and Movies on Ticket Show" />    
    <router-link to="/movies" class="link">
      <strong><em>Book a Show</em></strong>
      <i class="bi bi-arrow-right ms-2"></i>
    </router-link>
  </div>
</template>

<script>
// @ is an alias to /src
import CarouselBar from "@/components/CarouselBar.vue";

export default {
  name: "HomeView",
  components: {
    CarouselBar
  },
};
</script>

<style>
  .link {   
    color: #42b983;
    font: 2em sans-serif;
  }
</style>