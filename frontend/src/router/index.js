import { createRouter, createWebHistory } from "vue-router";
import NProgress from "nprogress";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
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
