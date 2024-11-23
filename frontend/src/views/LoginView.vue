<template>
  <div
    class="w-full bg-primary-800 bg-gradient-to-bl from-primary-700 to-primary-900"
  >
    <div class="h-screen w-full flex justify-center items-center">
      <div
        class="w-full md:w-1/2 lg:w-1/3 xl:w-1/6 bg-white mb-24 mx-3 px-4 py-3 rounded-lg shadow-xl"
      >
        <div class="font-bold text-primary-700 text-4xl mt-2 mb-6">
          {{ $t('views.login.title') }}
        </div>

        <div class="mt-2">
          <label
            for="login-username"
            class="block text-sm font-medium text-gray-700"
          >
            {{ $t('views.login.email') }}
          </label>
          <div v-if="!error.username" class="">
            <input
              v-model="form.username"
              name="username"
              type="text"
              id="login-username"
              autocomplete="email"
              class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary-600 focus:outline-none focus:ring-primary-600 sm:text-sm"
            />
          </div>
          <div v-else>
            <div class="relative rounded-md shadow-sm">
              <input
                type="text"
                name="username"
                id="login-username"
                autocomplete="email"
                class="block w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                v-model="form.username"
                aria-invalid="true"
                aria-describedby="username-error"
              />
              <div
                class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
              >
                <ExclamationCircleIcon
                  class="h-5 w-5 text-red-500"
                  aria-hidden="true"
                />
              </div>
            </div>
            <p class="text-sm text-red-600">
              {{ $t('validation.requiredField') }}
            </p>
          </div>
        </div>
        <div class="mt-2">
          <label
            for="login-password"
            class="block text-sm font-medium text-gray-700"
          >
            {{ $t('views.login.password') }}
          </label>
          <div v-if="!error.password" class="">
            <input
              v-model="form.password"
              name="password"
              type="password"
              id="login-password"
              autocomplete="password"
              class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary-600 focus:outline-none focus:ring-primary-600 sm:text-sm"
            />
          </div>
          <div v-else>
            <div class="relative rounded-md shadow-sm">
              <input
                type="password"
                name="password"
                id="login-password"
                autocomplete="password"
                class="block w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                v-model="form.password"
                aria-invalid="true"
                aria-describedby="password-error"
              />
              <div
                class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
              >
                <ExclamationCircleIcon
                  class="h-5 w-5 text-red-500"
                  aria-hidden="true"
                />
              </div>
            </div>
            <p class="text-sm text-red-600">
              {{ $t('validation.requiredField') }}
            </p>
          </div>
        </div>

        <div class="mt-10">
          <button
            @click="handleLogin"
            :disabled="loading"
            class="mt-4 flex w-full justify-center rounded-md border border-transparent bg-primary-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            <LoadingIcon v-if="loading" class="h-5 w-5 text-white" />
            <div class="text-md" v-else>
              {{ $t('views.login.loginCTA') }}
            </div>
          </button>
        </div>

        <div class="mt-2 flex items-center justify-center">
          <div class="text-xs font-sans text-primary-500">
            {{ $t('views.login.toRegisterMessage') }}
          </div>
          <div
            class="ml-1 text-xs font-sans underline text-info transition duration-150 ease-in-out hover:text-info-600 focus:text-info-600 active:text-info-700"
          >
            <router-link to="register">
              {{ $t('views.login.registerLinkCTA') }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ExclamationCircleIcon } from '@heroicons/vue/20/solid'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import LoadingIcon from '@/components/LoadingIcon.vue'
import { useApiFetch } from '@/composables/useApi'

const { t } = useI18n()
const router = useRouter()

const form = ref({
  username: null,
  password: null,
})

const error = ref({
  username: null,
  password: null,
})

const loading = ref(false)

const handleLogin = async () => {
  loading.value = true

  error.value = {
    username: null,
    password: null,
  }

  if (!form.value.username) {
    error.value.username = t('validation.requiredField')
    loading.value = false
    return
  }

  if (!form.value.password) {
    error.value.password = t('validation.requiredField')
    loading.value = false
    return
  }

  try {
    const { response, data } = await useApiFetch('auth/login')
      .post({
        email: form.value.username,
        password: form.value.password,
      })
      .json()

    if (response.value?.ok) {
      console.log('Login successful:', data.value)

      await router.push({ name: 'dashboard' })
    } else {
      console.error('Login failed:', data.value)
      error.value.username = data.value?.message || t('validation.loginFailed')
    }
  } catch (err) {
    console.error('Unexpected error during login:', err)
    error.value.username = t('validation.networkError')
  } finally {
    loading.value = false
  }
}
</script>
