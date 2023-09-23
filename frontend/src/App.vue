<template>
<div >
  <NavBar />
  <router-view />
</div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
export default {
  components: {
    NavBar
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}


.-fill-gradient{
  background: linear-gradient(to right, #16c0b0, #84cf6a);
  color: #fff;
  font-variant: small-caps;
  transition: all 0.2s linear;
}

.-fill-gradient:hover{
  -webkit-transform: scale(1.02);
  transform: scale(1.02);
  box-shadow: 0 7px 17px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}


nav a.router-link-exact-active {
  color: #42b983;
}

.error {
  border: 1px solid red;
}
.errorMessage {
  color: red;
}
</style>
