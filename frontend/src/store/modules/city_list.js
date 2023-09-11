import EventService from '@/services/event_services';

export const namespaced = true

export const state = {
    cities: []
}

export const mutations = {
    SET_CITIES(state,cities){
        state.cities=cities
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
    }

}

export const getters = {

}
