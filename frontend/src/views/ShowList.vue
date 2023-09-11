<template>
  <div class="movie-list p-2">
    <h2>Recent Releases</h2>
    <div class="movie-list-container">
      <div class="card mx-1" v-for="movie in movies" :key="movie.title">
        <img :src="movie.coverImage" class="card-img-top" :alt="movie.title" />
        <div class="card-body">
          <h5 class="card-title">{{ movie.title }}</h5>
          <p class="card-text">{{ movie.movietext }}</p>
          <a href="#" class="btn btn-success">Book show</a>
        </div>
      </div>
    </div>
    <h2>Recent Releases</h2>
    <div class="movie-list-container">
      <div class="card mx-1" v-for="movie in movies" :key="movie.title">
        <img :src="movie.coverImage" class="card-img-top" :alt="movie.title" />
        <div class="card-body">
          <h5 class="card-title">{{ movie.title }}</h5>
          <p class="card-text">{{ movie.movietext }}</p>
          <a href="#" class="btn btn-success">Book show</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MovieList',
  data() {
    return {
      movies: [
        {
          title: 'Nasha Jurr Gangsters ',
          coverImage: 'https://c4.wallpaperflare.com/wallpaper/267/666/423/joker-2019-movie-joker-joaquin-phoenix-movies-dancing-hd-wallpaper-preview.jpg',
          movietext: 'Sometext',
          rating: 4
        },
        {
          title: 'Kokomo City',
          coverImage: 'https://c4.wallpaperflare.com/wallpaper/267/666/423/joker-2019-movie-joker-joaquin-phoenix-movies-dancing-hd-wallpaper-preview.jpg',
          movietext: 'Sometext',
          rating: 5
        },
        {
          title: 'Raja City',
          coverImage: 'https://c4.wallpaperflare.com/wallpaper/267/666/423/joker-2019-movie-joker-joaquin-phoenix-movies-dancing-hd-wallpaper-preview.jpg',
          movietext: 'Sometext',
          rating: 5
        },
        {
          title: 'Kokomo City',
          coverImage: 'https://c4.wallpaperflare.com/wallpaper/267/666/423/joker-2019-movie-joker-joaquin-phoenix-movies-dancing-hd-wallpaper-preview.jpg',
          movietext: 'Sometext',
          rating: 5
        },
        // ...
      ]
    }
  }
}
</script>

<style scoped>
.movie-list {
  width: 100%;
}

.movie-list-container {
  overflow-x: auto;
  white-space: nowrap;
}

.movie-list-container .card {
  display: inline-block;
  width: 15rem;
}


.rating {
  color: #f5c518;
}
</style>
