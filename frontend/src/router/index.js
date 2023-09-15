import { createRouter, createWebHistory } from "vue-router";
import NProgress from "nprogress";
import HomeView from "../views/HomeView.vue";
import LoginUser from "../views/LoginUser.vue"
import RegisterUser from "../views/RegisterUser"
import ShowList from "../views/ShowList.vue"
import TestUser from "../views/TestUser.vue"
import SearchCity from "../views/SearchCity.vue"
import AddShow from "../views/AddShow.vue"
import AddVenue from "../views/AddVenue.vue"
import VenueCrud from "../views/VenueCrud"
import AddonShow from "../views/AddonShow.vue"
import EditShow from "../views/EditShow.vue"
import BookShow from "../views/BookShow.vue"
import BookedTickets from "../views/BookedTickets.vue"

const routes = [
  {
    path: "/test",
    name: "test",
    component: TestUser
  },
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginUser
  },
  {
    path: "/register",
    name: "register",
    component: RegisterUser
  },
  {
    path: "/showlist/:city_name",
    name: "showlist",
    component: ShowList,
    meta: {requiresAuth: true}
  },
  {
    path: "/searchcity",
    name: "searchcity",
    component: SearchCity,
  },
  {
    path: "/addshow",
    name: "addshow",
    component: AddShow,
    meta: {requiresAuth: true}
  },
  {
    path:"/addvenue",
    name: "addvenue",
    component: AddVenue,
    meta: {requiresAuth: true}
  },
  {
    path:"/venuecrud/:id",
    name: "venuecrud",
    component: VenueCrud,
    meta: {requiresAuth: true}
  },
  {
    path:"/addonshow/:id",
    name: "addonshow",
    component: AddonShow,
    meta: {requiresAuth: true}
  },
  {
    path:"/editshow/:id",
    name:"editshow",
    component: EditShow,
    meta: {requiresAuth: true}
  },
  {
    path:"/bookshow/:id",
    name:"bookshow",
    component: BookShow,
    meta: {requiresAuth: true}
  },
  {
    path:"/bookedtickets/:id",
    name: "bookedtickets",
    component: BookedTickets,
    meta: {requiresAuth: true}
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((routeTo, routeFrom, next) => {
  NProgress.start()
  const loggedIn = localStorage.getItem('user')
  if (routeTo.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
    next({ name: 'login' })
  }
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router;
