<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg bg-body-tertiary -fill-gradient">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">
                <img src="../assets/logo.png" alt="Logo" width="26" height="24" class="d-inline-block align-text-top "> 
                Ticket Show
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon "></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                    <router-link :to="{name:'login'}" v-if="!loggedIn" class="nav-link active" aria-current="page">Login/Register</router-link>
                    <router-link to="/" v-else class="nav-link active" @click.native="logout">Logout</router-link>
                    </li>
                    <li class="nav-item dropdown"> </li>
                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Dropdown
                    </a>
                    <ul class="dropdown-menu">
                        <li v-if="ifAdmin"><h4 class="dropdown-item">Admin 🔖</h4></li>
                        <li v-else><h4 class="dropdown-item">User 🏷️</h4></li>   <!-- we can change it to {{ username }} -->
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="#">Another action</a></li>
                        <li><a class="dropdown-item" href="#">Something else here</a></li>
                    </ul>
                </ul>
                <form v-if="!ifAdmin" class="d-flex" role="search">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                    <button class="btn btn-outline-light" type="submit">Search</button>
                </form>
            </div>
        </div>
    </nav>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    computed:{
    ...mapGetters('user_auth',['loggedIn','ifAdmin']),
    
    // username(){
    //   return this.$store.state.user_auth.user.username
    // }
  },
  methods:{
    logout(){
      console.log('Loggded out')
      this.$store.dispatch('user_auth/logout')
    }
  }
}
</script>

<style>

</style>