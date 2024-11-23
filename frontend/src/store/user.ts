import { markRaw } from 'vue'
import router from '@/router/index'
import { defineStore, createPinia } from 'pinia'
import { useApiFetch } from '@/composables/useApi'
import { GetUserDto } from '@/types/user'
import { UseFetchReturn } from '@vueuse/core'

//const useRouter = markRaw(router)

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      auth: false,
      accessToken: '',
      first_name: '',
      last_name: '',
      email: '',
      createdAt: '',
      id: 0,
    }
  },

  getters: {
    isAuth: (state) => state.auth,
    getAccessToken: (state) => state.accessToken,
    getFirstName: (state) => state.first_name,
    getLastName: (state) => state.last_name,
    getEmail: (state) => state.email,
    getCreatedAt: (state) => state.createdAt,
  },

  actions: {
    logout() {
      this.setFirstName('')
      this.setLastName('')
      this.setEmail('')
      this.setAccessToken('')
      this.setCreatedAt('')
      this.setAuth(false)

      window.localStorage.removeItem('accessToken')
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
    setCreatedAt(createdAt: string) {
      this.createdAt = createdAt
    },
    setId(id: number) {
      this.id = id
    },
    async init() {
      const token = window.localStorage.getItem('accessToken')
      if (token) {
        const { response, data } = await useApiFetch('auth/me').get().json()
        console.log(data.value)
        if (response.value?.status === 200) {
          this.setFirstName(data.value.firstName)
          this.setLastName(data.value.lastName)
          this.setEmail(data.value.email)
          this.setCreatedAt(data.value.createdAt)
          this.setAccessToken(token)
          this.setAuth(true)
          this.setId(data.value.id)
        }
        if (response.value?.status === 401) {
          window.localStorage.removeItem('accessToken')
        }
      }
    },
  },
})
