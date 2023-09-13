import { createStore } from "vuex";
import * as user_auth from "./modules/user_auth.js";
import * as register_user from "./modules/register_user.js"
import * as city_list from "./modules/city_list.js"
import * as venues from "./modules/venues.js"
import * as shows from "./modules/shows.js"

export default createStore({
  modules:{
    user_auth,
    register_user,
    city_list,
    venues,
    shows
  },
  state: {},
  getters: {},
  mutations: {},
  actions: {},
});
