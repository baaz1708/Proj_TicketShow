import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from 'axios'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
// Import Bootstrap
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

// Import Vuelidate
import Vuelidate from 'vuelidate'

const app = createApp(App)

app.use(Vuelidate)
app.use(store)
app.use(router)

// app.mixin({
//   created() {
//     const userString = localStorage.getItem('user')
//     if (userString) {
//       const userData = JSON.parse(userString)
//       store.commit('user_auth/LOGIN_DATA', userData)
//     }

//     axios.interceptors.response.use(
//       response => response,
//       error => {
//         if (error.response.status === 401) {
//           store.dispatch('user_auth/logout')
//         }
//         return Promise.reject(error)
//       }
//     )
//   }
// })

const requireComponent = require.context(
  '@/components',
  false,
  /Base[A-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)

  const componentName = upperFirst(
    camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, '$1'))
  )

  app.component(componentName, componentConfig.default || componentConfig)
})

app.mount("#app")
