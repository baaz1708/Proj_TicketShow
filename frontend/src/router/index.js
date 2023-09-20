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
    component: TestUser,
    meta: {requiresAuth: false, roles:['Admin']}
  },
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {requiresAuth: false, roles:['Admin','normal']}
  },
  {
    path: "/login",
    name: "login",
    component: LoginUser,
    meta: {requiresAuth: false, roles:['Admin', 'normal']}
  },
  {
    path: "/register",
    name: "register",
    component: RegisterUser,
    meta: {requiresAuth: false, roles:['Admin','normal']}
  },
  {
    path: "/showlist/:city_id",
    name: "showlist",
    component: ShowList,
    meta: {requiresAuth: true, roles:['Admin', 'normal']}
  },
  {
    path: "/searchcity",
    name: "searchcity",
    component: SearchCity,
    meta: {requiresAuth: true, roles:['Admin', 'normal']}
  },
  {
    path: "/addshow",
    name: "addshow",
    component: AddShow,
    meta: {requiresAuth: true, roles:['Admin', ]}
  },
  {
    path:"/addvenue",
    name: "addvenue",
    component: AddVenue,
    meta: {requiresAuth: true, roles:['Admin', ]}
  },
  {
    path:"/venuecrud/:id",
    name: "venuecrud",
    component: VenueCrud,
    meta: {requiresAuth: true, roles:['Admin', ]}
  },
  {
    path:"/addonshow/:id",
    name: "addonshow",
    component: AddonShow,
    meta: {requiresAuth: true, roles:['Admin', ]}
  },
  {
    path:"/editshow/:id",
    name:"editshow",
    component: EditShow,
    meta: {requiresAuth: true, roles:['Admin', ]}
  },
  {
    path:"/bookshow/:id",
    name:"bookshow",
    component: BookShow,
    meta: {requiresAuth: true, roles:['Admin', 'normal']}
  },
  {
    path:"/bookedtickets/:id",
    name: "bookedtickets",
    component: BookedTickets,
    meta: {requiresAuth: true, roles:['Admin', 'normal']}
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((routeTo, routeFrom, next) => {
  NProgress.start()
  const loggedIn = localStorage.getItem('user')
  let userRoles = []
  if (loggedIn){
    const user = JSON.parse(localStorage.getItem('user')) // assuming user is stored as a JSON string
    userRoles = user.roles // assuming roles is a property of user
  }
  if (routeTo.matched.some(record => record.meta.requiresAuth)) {
    if (!loggedIn) {
      next({ name: 'login' }) // redirect to login page if not authenticated
    } else if (routeTo.matched.some(record => record.meta.roles && record.meta.roles.some(role => userRoles.includes(role)))) {
      next() // proceed if user has at least one of the required roles
    } else {
      next({ name: 'test' }) // redirect to not authorized page if role not matched
    }
  } else {
    next() // make sure to always call next()!
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router;
