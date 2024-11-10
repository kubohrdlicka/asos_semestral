import { createApp } from 'vue'
import './tailwind.css'
import VueApexCharts from 'vue3-apexcharts'

// @ts-ignore
import App from './App.vue'
import router from './router'

// import Pinia store
import { createPinia } from 'pinia'

const app = createApp(App)


const pinia = createPinia()
app.use(pinia)

// locale
import i18n from './locale'
import {useUserStore} from "@/store/user";
app.use(i18n)
app.use(VueApexCharts)


const userStore = useUserStore()
userStore.init().then(()=>{
  app.use(router)
  app.mount('#app')
})

