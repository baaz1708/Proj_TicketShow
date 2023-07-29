import EventService from "@/services/event_services";

export const namespaced = true;

export const state ={
    user: null

}

export const mutations = {
    SET_USER_DATA(state, userdata) {
        state.user = userdata;
    }

}

export const actions = {
    register ({ commit }, credentials) {
        console.log('before register user',credentials)
        return EventService.postRegistration(credentials).then((response) => {
            const data = response.data;
            console.log('after post registration',data);
            if (response.status >= 200) {
                commit('SET_USER_DATA', data)
                
            }
    })  
    }

}

export const getters = {
}
