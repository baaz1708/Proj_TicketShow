<template>
  <div>
    <div id="carouselExampleCaptions" class="carousel slide mt-1" data-bs-ride="carousel" data-bs-interval="2000">
      <div class="carousel-inner" >
        <div class="carousel-item active">
          <img src="https://images2.alphacoders.com/589/589553.png" alt="...">
          <div class="carousel-caption d-none d-md-block">
            <h5>{{msg}}</h5>
            <p>Some text</p>
          </div>
        </div>
        <div class="carousel-item">
          <img src="https://c4.wallpaperflare.com/wallpaper/267/666/423/joker-2019-movie-joker-joaquin-phoenix-movies-dancing-hd-wallpaper-preview.jpg" class="d-block w-100" alt="...">
          <div class="carousel-caption d-none d-md-block">
            <h5>{{msg}}</h5>
            <p>Book your shows and Tickets</p>
          </div>
        </div>
        <div class="carousel-item">
          <img src="https://c4.wallpaperflare.com/wallpaper/293/101/257/movies-inception-leonardo-dicaprio-wallpaper-preview.jpg" class="d-block w-100" alt="...">
          <div class="carousel-caption d-none d-md-block">
            <h5>{{msg}}</h5>
            <p>Book your shows and tickets</p>
          </div>
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
    <div class="container">
      <h5></h5>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.carousel-item img {
  height: 600px;
  width: 100%;
}

</style>
