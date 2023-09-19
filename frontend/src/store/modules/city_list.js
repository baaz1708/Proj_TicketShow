import EventService from '@/services/event_services';

export const namespaced = true

export const state = {
    cities: [],
    city:{}
}

export const mutations = {
    SET_CITIES(state,cities){
        state.cities=cities
    },
    SET_CITY(state,city){
        state.city=city
    }

}

export const actions = {
    fetchCities({commit}){
        return EventService.getCities()
        .then(response =>{
            console.log('data after fetchCities', response)
            commit('SET_CITIES',response.data)
        })
        .catch(error => {
            console.log('error in fetching cities and SET_CITIES mutaion in state', error)
        })
    },

    fetchCity({commit},payload){
        return EventService.getCity(payload.city_id)
        .then(response => {
            console.log('data after fetchCity', response),
            commit('SET_CITY',response.data)
        })
    }
}

export const getters = {

}
