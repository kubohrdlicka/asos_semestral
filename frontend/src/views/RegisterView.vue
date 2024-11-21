<template>
  <div class="w-full bg-primary-800 bg-gradient-to-br from-primary-700 to-primary-900">
    <div class="h-screen w-full flex justify-center items-center">
      
      <div class="w-full md:w-1/2 lg:w-1/3 xl:w-1/6 bg-white mb-24 mx-3 px-4 py-3 rounded-lg shadow-xl">

        <div class="font-bold text-primary-700 text-4xl mt-2 mb-6">{{ $t('views.register.title') }}</div>

        <div class="mt-2">
          <label for="register-name" class="block text-sm font-medium text-gray-700">
            {{ $t('views.register.name') }}
          </label>
          <div v-if="!error.name" class="">
            <input
              v-model="form.name" name="name" type="text" id="register-name" autocomplete="name"
              class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary-600 focus:outline-none focus:ring-primary-600 sm:text-sm"
            />
          </div>
          <div v-else>
            <div class="relative rounded-md shadow-sm">
              <input 
                type="text" name="name" id="register-name" autocomplete="name" 
                class="block w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                v-model="form.name" aria-invalid="true" aria-describedby="username-error"
              />
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <ExclamationCircleIcon class="h-5 w-5 text-red-500" aria-hidden="true" />
              </div>
            </div>
            <p class="text-sm text-red-600">{{ $t(error.name) }}</p>
          </div>
        </div>
        <div class="mt-2">
          <label for="register-username" class="block text-sm font-medium text-gray-700">
            {{ $t('views.register.email') }}
          </label>
          <div v-if="!error.email" class="">
            <input
              v-model="form.email" name="username" type="text" id="register-username" autocomplete="email"
              class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary-600 focus:outline-none focus:ring-primary-600 sm:text-sm"
            />
          </div>
          <div v-else>
            <div class="relative rounded-md shadow-sm">
              <input 
                type="text" name="username" id="register-username" autocomplete="email" 
                class="block w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                v-model="form.email" aria-invalid="true" aria-describedby="username-error"
              />
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <ExclamationCircleIcon class="h-5 w-5 text-red-500" aria-hidden="true" />
              </div>
            </div>
            <p class="text-sm text-red-600">{{ $t(error.email) }}</p>
          </div>
        </div>
        <div class="mt-2">
          <label for="register-password" class="block text-sm font-medium text-gray-700">
            {{ $t('views.register.password') }}
          </label>
          <div v-if="!error.password" class="">
            <input
              v-model="form.password" name="password" type="text" id="register-password" autocomplete="password"
              class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary-600 focus:outline-none focus:ring-primary-600 sm:text-sm"
            />
          </div>
          <div v-else>
            <div class="relative rounded-md shadow-sm">
              <input 
                type="text" name="password" id="register-password" autocomplete="password" 
                class="block w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                v-model="form.password" aria-invalid="true" aria-describedby="password-error"
              />
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <ExclamationCircleIcon class="h-5 w-5 text-red-500" aria-hidden="true" />
              </div>
            </div>
            <p class="text-sm text-red-600">{{ $t(error.password) }}</p>
          </div>
        </div>
        <div class="mt-2">
          <label for="register-password" class="block text-sm font-medium text-gray-700">
            {{ $t('views.register.passwordRepeat') }}
          </label>
          <div v-if="!error.passwordRepeat" class="">
            <input
              v-model="form.passwordRepeat" name="passwordRepeat" type="text" id="register-passwordRepeat" autocomplete="password"
              class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary-600 focus:outline-none focus:ring-primary-600 sm:text-sm"
            />
          </div>
          <div v-else>
            <div class="relative rounded-md shadow-sm">
              <input 
                type="text" name="passwordRepeat" id="register-passwordRepeat" autocomplete="password" 
                class="block w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                v-model="form.passwordRepeat" aria-invalid="true" aria-describedby="password-error"
              />
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <ExclamationCircleIcon class="h-5 w-5 text-red-500" aria-hidden="true" />
              </div>
            </div>
            <p class="text-sm text-red-600">{{ $t(error.passwordRepeat) }}</p>
          </div>
        </div>

        <div v-if="error.result" class="mt-6 text-bold text-red-600 flex items-center justify-center">
          <ExclamationCircleIcon class="h-5 w-5 text-red-500 me-2" aria-hidden="true" />
          <div class="">{{ $t(error.result) }}</div>
        </div>        

        <div class="mt-10">
          <button @click="handleLogin" :disabled="loading" class="mt-4 flex w-full justify-center rounded-md border border-transparent bg-primary-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
            <LoadingIcon
              v-if="loading"
              class="h-5 w-5 text-white"
            />
            <div class="text-md" v-else>
              {{ $t('views.register.registerCTA') }}
            </div>
          </button>
        </div>

        <div class="mt-2 flex items-center justify-center">
          <div class="text-xs font-sans text-primary-500">
            {{ $t('views.register.toLoginMessage')}}
          </div>
          <div class="ml-1 text-xs font-sans underline text-info transition duration-150 ease-in-out hover:text-info-600 focus:text-info-600 active:text-info-700">
            <router-link to="login">
              {{ $t('views.register.loginLinkCTA')}}
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
import LoadingIcon from '@/components/LoadingIcon.vue'

interface RegisterFormError {
  name: string | null;
  email: string | null;
  password: string | null;
  passwordRepeat: string | null;
  result: string | null;
}

const form = ref({
  name: null,
  email: null,
  password: null,
  passwordRepeat: null,
})
const error = ref<RegisterFormError>({
  name: null,
  email: null,
  password: null,
  passwordRepeat: null,
  result: null,
})
const loading = ref(false)

const handleLogin = async () => {
  error.value = {name: null, email: null, password: null, passwordRepeat: null, result: null}
  const usernameMissing = form.value.name === null || form.value.name === ""
  const emailMissing = form.value.email === null || form.value.email === ""  // TODO: maybe email regex check
  const passwordMissing = form.value.password === null || form.value.password === ""
  const passwordRepeatMissing = form.value.passwordRepeat === null || form.value.passwordRepeat === ""
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const emailNotValid = form.value.email !== null && !emailRegex.test(form.value.email)
  
  if (emailNotValid) {
    error.value.email = 'validation.notValidEmail'
  }

  if (usernameMissing) {
    error.value.name = 'validation.requiredField'
  }
  if (emailMissing) {
    error.value.email = 'validation.requiredField'
  }
  if (passwordMissing) {
    error.value.password = 'validation.requiredField'
  }
  if (passwordRepeatMissing) {
    error.value.passwordRepeat = 'validation.requiredField'
  }
  if (usernameMissing || emailMissing || passwordMissing || passwordRepeatMissing || emailNotValid) {
    return
  }

  loading.value = true

  // TODO: api call to login

  error.value.result = 'views.register.registrationFailed'
}

</script>
