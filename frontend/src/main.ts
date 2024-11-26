import { createApp } from 'vue'
import './tailwind.css'
import VueApexCharts from 'vue3-apexcharts'
import dayjs from 'dayjs'
import 'dayjs/locale/en-gb'
import Calendar from 'dayjs/plugin/calendar'

// @ts-ignore
import App from './App.vue'
import router from './router'

// import Pinia store
import { createPinia } from 'pinia'

dayjs.locale('en-gb')
dayjs.extend(Calendar)

const app = createApp(App)
app.config.globalProperties.$dayjs = dayjs

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

