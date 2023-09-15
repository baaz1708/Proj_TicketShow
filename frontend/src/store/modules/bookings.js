import EventService from '@/services/event_services';

export const namespaced = true

export const state = {
    Booking_data:{}
}

export const mutations = {
    SET_BOOKING_DATA(state,booking_data){
        state.Booking_data = booking_data
    }
}

export const actions = {
    addBooking({commit},booking_data){
        console.log('before add booking in action', booking_data);
        return EventService.postBooking(booking_data)
        .then((res) =>{
            console.log('After booking data', res.data);
            commit('SET_BOOKING_DATA', res.data);
        })
    }

}

export const getters = {

}
