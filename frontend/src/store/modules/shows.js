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
        })
    },

    fetchShow({commit},payload){
        const {show_id, venue_id} = payload
        console.log('Before get show in action', 'showid',show_id, 'venueid',venue_id)
        return EventService.getShow(show_id,venue_id)
        .then((res) =>{
            console.log('After getting show', res.data)
            commit('SET_SHOW', res.data)
        })

    },

    editShow({commit}, payload){
        const {venue_id,show_id, ...show_data } = payload
        console.log('Before editing show in action', 'venue_id',venue_id, 'show_data',show_data, 'show_id',show_id)
        return EventService.editShow(venue_id,show_id, show_data)
        .then((res) =>{
            console.log('After editing show in venue', res.data)
            commit('SET_SHOW', res.data)
        })
    },

    deleteShow({commit},payload){
        const {show_id, venue_id} = payload
        console.log('Before deleting show', 'showID',show_id, 'venueID', venue_id)
        return EventService.deleteShow(show_id,venue_id)
        .then(() =>{
            console.log('After deleteing show')
        })
    }

}

export const getters = {

}
