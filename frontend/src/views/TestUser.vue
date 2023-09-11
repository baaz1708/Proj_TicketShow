<template>
  <div >
    <h2>here's the id</h2>
    <h1>{{ id }}</h1>
  </div>
</template>

<script>
export default {
    data(){
        return{
            id:""
        }
    },
//use combination of created and data whenever you need to access the route query params for page u'r navingating to
    created(){
        this.id = this.$route.params.id   
    }
}
</script>

<style>

</style>