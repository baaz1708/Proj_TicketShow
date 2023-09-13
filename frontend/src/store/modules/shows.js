import EventService from '@/services/event_services';

export const namespaced = true

export const state = {
    show:{}

}

export const mutations = {
    SET_SHOW(state,show){
        state.show=show
    }

}

export const actions = {
   async addShow({commit}, payload){   //or const { venue_id, ...dataWithoutVenueId } = show_data;
    const {venue_id, ...show_data } = payload
    console.log('Before adding show in action', 'venue_id',venue_id, 'show_data',show_data)
    return EventService.postShow(venue_id, show_data)
        .then((res) =>{
            console.log('After posting show in venue', res.data)
            commit('SET_SHOW', res.data)
        })
    }

}

export const getters = {

}
