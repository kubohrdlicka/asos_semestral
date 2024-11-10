import { markRaw } from 'vue'
import router from '@/router/index'
import { defineStore, createPinia } from 'pinia'
import {useApiFetch} from "@/composables/useApi";
import {GetUserDto} from "@/types/user";
import {UseFetchReturn} from "@vueuse/core";

//const useRouter = markRaw(router)

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      auth: false,
      accessToken: '',
      first_name: '',
      last_name: '',
      email: '',
    }
  },

  getters: {
    isAuth: (state) => state.auth,
    getAccessToken: (state) => state.accessToken,
    getFirstName: (state) => state.first_name,
    getLastName: (state) => state.last_name,
    getEmail: (state) => state.email,
  },

  actions: {
    logout() {
      this.setFirstName('');
      this.setLastName('');
      this.setEmail('');
      this.setAccessToken('');
      this.setAuth(false);

      window.localStorage.removeItem('accessToken');
    },
    setAccessToken(token: string) {
      this.accessToken = token
      window.localStorage.setItem('accessToken', token)
    },
    setAuth(newState: boolean) {
      this.auth = newState
    },
    setFirstName(first_name: string) {
      this.first_name = first_name
    },
    setLastName(last_name: string) {
      this.last_name = last_name
    },
    setEmail(email: string) {
      this.email = email
    },
    async init() {
      const token = window.localStorage.getItem('accessToken')
      if (token) {
        const {response, data} = await useApiFetch('me').get().json();
        if (response.value?.status === 200) {
          this.setFirstName(data.value.first_name)
          this.setLastName(data.value.last_name)
          this.setEmail(data.value.email)
          this.setAccessToken(token)
          this.setAuth(true)
        }
        if(response.value?.status === 401) {
          window.localStorage.removeItem('accessToken')
        }
      }
    }
  },
})
