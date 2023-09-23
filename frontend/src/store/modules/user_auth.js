import EventService from "@/services/event_services";

export const namespaced = true;

export const state ={
    user: null
}

export const mutations = {
    LOGIN_DATA (state, userData) {
        console.log('check whats the userdata inside mutation LOGIN_DATA', 'userData.user',userData.user, 'useData.token',userData.token)
        state.user = userData.user
        localStorage.setItem('user', JSON.stringify(userData.user))
        localStorage.setItem('token',userData.token)
        EventService.addtoken()

    },
    CLEAR_USER_DATA () {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        location.reload()
    },
    SET_USER(state,userData) {
        state.user = userData
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
    },
    fetchUser({commit},id_obj){
        console.log('Befor get user in action', 'userid',id_obj)
        return EventService.getUser(id_obj.id).then((response) =>{
            const data = response.data;
            console.log('After get user in action', data)
            if(response.status < 400){
                console.log("user get success with 200")
                commit('SET_USER', data)
            }
        })
    }

}

export const getters = {
    loggedIn (state) {
        return !!state.user
    },
     ifAdmin (state) {
        return !!(state.user && state.user.roles.includes('Admin'))
     }
}