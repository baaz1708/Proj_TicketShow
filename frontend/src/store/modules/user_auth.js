import EventService from "@/services/event_services";

export const namespaced = true;

export const state ={
    user: null
}

export const mutations = {
    LOGIN_DATA (state, userData) {
        state.user = userData
        localStorage.setItem('user', JSON.stringify(userData))
    },
    CLEAR_USER_DATA () {
        localStorage.removeItem('user')
        location.reload()
    }
}

export const actions = {
    login ({ commit }, credentials) {
        console.log("before post login",credentials)
        return EventService.postLogin(credentials).then((response) =>{
            const data = response.data;
            console.log("after post login",data);
            if(response.status < 400){
                console.log("login success with 200")
                commit('LOGIN_DATA', data)
            }
        })
    },
    logout ({ commit }) {
        commit('CLEAR_USER_DATA')
    }

}

export const getters = {
    loggedIn (state) {
        return !!state.user
    },
     ifAdmin (state) {
        return false
        // return state.user && state.user.role === 'admin'
     }
}