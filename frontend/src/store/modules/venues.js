import EventService from '@/services/event_services';

export const namespaced = true

export const state = {
    venues:[],
    venue: {}

}

export const mutations = {
    SET_VENUES(state,venues){
        state.venues = venues
    },
    SET_VENUE(state,venue){
        state.venue = venue
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

    },
    fetchVenueById({commit},venue_id){
        return EventService.getVenue(venue_id.id)
        .then((res) => {
            console.log('After getting venue by id', res)
            commit('SET_VENUE', res.data)
        })
    },
    updateVenue({commit},venue_data){
        return EventService.updateVenue(venue_data)
        .then((res) => {
            console.log('After updating venue', res)
            commit('SET_VENUE', res.data)
        })
    },
    deleteVenue({commit},venue_id){  // i was writing just venue_id before which was wrong, its must to write {commit},anydata
        return EventService.deleteVenue(venue_id.id)
        .then(() =>{
            console.log('After deleting the venue')
        })
    }

}

export const getters = {

}
