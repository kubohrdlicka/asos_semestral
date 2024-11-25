<template>
  <div
    class="w-full bg-primary-800 bg-gradient-to-br from-primary-700 to-primary-900"
  >
    <div class="h-screen w-full flex justify-center items-center">
      <div
        class="w-full md:w-1/2 lg:w-1/3 xl:w-1/6 bg-white mb-24 mx-3 px-4 py-3 rounded-lg shadow-xl"
      >
        <div class="font-bold text-primary-700 text-4xl mt-2 mb-6">
          {{ $t('views.register.title') }}
        </div>

        <!-- First Name -->
        <div class="mt-2">
          <label
            for="register-first-name"
            class="block text-sm font-medium text-gray-700"
          >
            {{ $t('views.register.firstName') }}
          </label>
          <div v-if="!error.firstName" class="">
            <input
              v-model="form.firstName"
              name="firstName"
              type="text"
              id="register-first-name"
              autocomplete="given-name"
              class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary-600 focus:outline-none focus:ring-primary-600 sm:text-sm"
            />
          </div>
          <div v-else>
            <div class="relative rounded-md shadow-sm">
              <input
                type="text"
                name="firstName"
                id="register-first-name"
                autocomplete="given-name"
                class="block w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                v-model="form.firstName"
                aria-invalid="true"
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
              {{ error.firstName }}
            </p>
          </div>
        </div>

        <!-- Last Name -->
        <div class="mt-2">
          <label
            for="register-last-name"
            class="block text-sm font-medium text-gray-700"
          >
            {{ $t('views.register.lastName') }}
          </label>
          <div v-if="!error.lastName" class="">
            <input
              v-model="form.lastName"
              name="lastName"
              type="text"
              id="register-last-name"
              autocomplete="family-name"
              class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary-600 focus:outline-none focus:ring-primary-600 sm:text-sm"
            />
          </div>
          <div v-else>
            <div class="relative rounded-md shadow-sm">
              <input
                type="text"
                name="lastName"
                id="register-last-name"
                autocomplete="family-name"
                class="block w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                v-model="form.lastName"
                aria-invalid="true"
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
              {{ error.lastName }}
            </p>
          </div>
        </div>

        <!-- Email -->
        <div class="mt-2">
          <label
            for="register-email"
            class="block text-sm font-medium text-gray-700"
          >
            {{ $t('views.register.email') }}
          </label>
          <div v-if="!error.email" class="">
            <input
              v-model="form.email"
              name="email"
              type="email"
              id="register-email"
              autocomplete="email"
              class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary-600 focus:outline-none focus:ring-primary-600 sm:text-sm"
            />
          </div>
          <div v-else>
            <div class="relative rounded-md shadow-sm">
              <input
                type="email"
                name="email"
                id="register-email"
                autocomplete="email"
                class="block w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                v-model="form.email"
                aria-invalid="true"
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
              {{ error.email }}
            </p>
          </div>
        </div>

        <!-- Password -->
        <div class="mt-2">
          <label
            for="register-password"
            class="block text-sm font-medium text-gray-700"
          >
            {{ $t('views.register.password') }}
          </label>
          <div v-if="!error.password">
            <input
              v-model="form.password"
              name="password"
              type="password"
              id="register-password"
              autocomplete="new-password"
              class="block w-full rounded-md border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary-600 focus:outline-none focus:ring-primary-600 sm:text-sm"
            />
          </div>
          <div v-else>
            <div class="relative rounded-md shadow-sm">
              <input
                type="password"
                name="password"
                id="register-password"
                autocomplete="new-password"
                class="block w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                v-model="form.password"
                aria-invalid="true"
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
              {{ error.password }}
            </p>
          </div>
        </div>

        <!-- Repeat Password -->
        <div class="mt-2">
          <label
            for="register-repeat-password"
            class="block text-sm font-medium text-gray-700"
          >
            {{ $t('views.register.passwordRepeat') }}
          </label>
          <div v-if="!error.passwordRepeat">
            <input
              v-model="form.passwordRepeat"
              name="passwordRepeat"
              type="password"
              id="register-repeat-password"
              autocomplete="new-password"
              class="block w-full rounded-md border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary-600 focus:outline-none focus:ring-primary-600 sm:text-sm"
            />
          </div>
          <div v-else>
            <div class="relative rounded-md shadow-sm">
              <input
                type="password"
                name="passwordRepeat"
                id="register-repeat-password"
                autocomplete="new-password"
                class="block w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                v-model="form.passwordRepeat"
                aria-invalid="true"
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
              {{ error.passwordRepeat }}
            </p>
          </div>
        </div>

        <div class="pt-6">
          <div v-if="error.result" class="text-red-600 text-center">
            {{ error.result }}
          </div>
        </div>

        <!-- Submit Button -->
        <div class="mt-4">
          <button
            @click="handleRegister"
            :disabled="loading"
            class="mt-4 flex w-full justify-center rounded-md border border-transparent bg-primary-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            <LoadingIcon v-if="loading" class="h-5 w-5 text-white" />
            <div class="text-md" v-else>
              {{ $t('views.register.registerCTA') }}
            </div>
          </button>
        </div>

        <div class="mt-2 flex items-center justify-center">
          <div class="text-xs font-sans text-primary-500">
            {{ $t('views.register.toLoginMessage') }}
          </div>
          <div
            class="ml-1 text-xs font-sans underline text-info transition duration-150 ease-in-out hover:text-info-600 focus:text-info-600 active:text-info-700"
          >
            <router-link to="login">
              {{ $t('views.register.loginLinkCTA') }}
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
import { useUserStore } from '@/store/user'

const { t } = useI18n()
const router = useRouter()
const store = useUserStore()

const form = ref({
  firstName: null,
  lastName: null,
  email: null,
  password: null,
  passwordRepeat: null,
})

const error = ref({
  firstName: null,
  lastName: null,
  email: null,
  password: null,
  passwordRepeat: null,
  result: null,
})

const loading = ref(false)

const handleRegister = async () => {
  loading.value = true

  error.value = {
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    passwordRepeat: null,
  }

  if (!form.value.firstName) {
    error.value.firstName = t('validation.requiredField')
    loading.value = false
    return
  }

  if (!form.value.lastName) {
    error.value.lastName = t('validation.requiredField')
    loading.value = false
    return
  }

  if (!form.value.email) {
    error.value.email = t('validation.requiredField')
    loading.value = false
    return
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(form.value.email)) {
    error.value.email = t('validation.invalidEmail')
    loading.value = false
    return
  }

  if (!form.value.password) {
    error.value.password = t('validation.requiredField')
    loading.value = false
    return
  }

  if (!form.value.passwordRepeat) {
    error.value.passwordRepeat = t('validation.requiredField')
    loading.value = false
    return
  }

  if (form.value.password !== form.value.passwordRepeat) {
    error.value.passwordRepeat = t('validation.passwordMismatch')
    loading.value = false
    return
  }

  try {
    const { response, data } = await useApiFetch('auth/register')
      .post({
        email: form.value.email,
        password: form.value.password,
        firstName: form.value.firstName,
        lastName: form.value.lastName,
      })
      .json()

    if (response.value?.ok) {
      console.log('Registration successful:', data.value)
      store.setAuth(true)
      store.setAccessToken(data.value.access_token)
      await store.init()

      await router.push({ name: 'dashboard' })
    } else {
      console.error('Registration failed:', data.value)
      error.value.result = data.value?.message || t('validation.serverError')
    }
  } catch (error) {
    console.error('Unexpected error during registration:', error)
    error.value.result = t('validation.networkError')
  } finally {
    loading.value = false
  }
}
</script>
