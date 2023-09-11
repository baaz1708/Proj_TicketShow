import EventService from '@/services/event_services';

export const namespaced = true

export const state = {
    venues:[]

}

export const mutations = {
    SET_VENUES(state,venues){
        state.venues = venues
    }

}

export const actions = {
    fetchVenues({commit}){
        return EventService.getVenues()
        .then(res => {
            console.log('data after fetch venues', res)
            commit('SET_VENUES', res.data)
        })
        .catch(error => {
            console.log('errror in fetching venues', error)
        })
    },
    addVenue({commit},venue_data){
        return EventService.postVenue(venue_data)
        .then(() => {
            console.log('after posting newvenue')
            // if (res.status >= 200 && res.status < 400) {
            //     commit('SET_VENUES', res.data)
            // }
        })

    }

}

export const getters = {

}
