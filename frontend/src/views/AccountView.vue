<template>
  <div class="flex min-h-full">
    <div class="container mx-auto">

      <section class="mt-8 mx-2 mb-2 flex items-center justify-between">
        <div class="font-bold text-primary-700 text-4xl">{{ $t('views.account.title') }}</div>
        <div>
          <button
            class="flex w-full items-center justify-center rounded-md border border-transparent bg-red-500 py-1 px-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            @click="logout">
            <span class="me-2 ps-1">
              {{ $t('views.account.logout') }}
            </span>
            <LockClosedIcon class="w-[18px] h-[18px]" />
          </button>
        </div>
      </section>

      <section class="mt-8">
        <div class="flex">
          <div class="mt-1 mx-3">
            <UserIcon class="w-[40px] h-[40px]" />
          </div>
          <div>
            <div class="text-xl font-bold">{{ 'Name Surname' }}</div>
            <div>{{ 'Email@email' }}</div>
            <div class="text-gray-400 text-sm">Member since {{ '*date*' }}</div>
          </div>
        </div>
      </section>

      <div class="w-full border-t border-gray-300 my-6"></div>

      <section class="w-full flex justify-center">
        <div class="mx-2 px-3 border border-gray-300 rounded-lg w-full pt-3 pb-5 md:w-1/2 lg:w-1/3 xl:w-1/4">
          <div class="pb-3 font-bold text-primary-600 text-xl">{{ $t('views.account.passwordChange') }}</div>

          <div class="mt-2">
            <label for="login-password-old" class="block text-sm font-medium text-gray-700">
              {{ $t('views.account.passwordOld') }}
            </label>
            <div v-if="!error.passwordOld" class="">
              <input v-model="form.passwordOld" name="password" type="password" id="login-password-old" autocomplete="password"
                class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary-600 focus:outline-none focus:ring-primary-600 sm:text-sm" />
            </div>
            <div v-else>
              <div class="relative rounded-md shadow-sm">
                <input type="password" name="password" id="login-password-old" autocomplete="password"
                  class="block w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                  v-model="form.passwordOld" aria-invalid="true" aria-describedby="password-error" />
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <ExclamationCircleIcon class="h-5 w-5 text-red-500" aria-hidden="true" />
                </div>
              </div>
              <p class="text-sm text-red-600">{{ $t('validation.requiredField') }}</p>
            </div>
          </div>

          <div class="py-2"></div>

          <div class="mt-2">
            <label for="login-password" class="block text-sm font-medium text-gray-700">
              {{ $t('views.account.passwordNew') }}
            </label>
            <div v-if="!error.password" class="">
              <input v-model="form.password" name="password" type="password" id="login-password" autocomplete="password"
                class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary-600 focus:outline-none focus:ring-primary-600 sm:text-sm" />
            </div>
            <div v-else>
              <div class="relative rounded-md shadow-sm">
                <input type="password" name="password" id="login-password" autocomplete="password"
                  class="block w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                  v-model="form.password" aria-invalid="true" aria-describedby="password-error" />
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <ExclamationCircleIcon class="h-5 w-5 text-red-500" aria-hidden="true" />
                </div>
              </div>
              <p class="text-sm text-red-600">{{ $t('validation.requiredField') }}</p>
            </div>
          </div>
          
          <div class="mt-2">
            <label for="login-password-repeat" class="block text-sm font-medium text-gray-700">
              {{ $t('views.account.passwordNewRepeat') }}
            </label>
            <div v-if="!error.passwordRepeat" class="">
              <input v-model="form.passwordRepeat" name="password-repeat" type="password" id="login-password-repeat" autocomplete="password"
                class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary-600 focus:outline-none focus:ring-primary-600 sm:text-sm" />
            </div>
            <div v-else>
              <div class="relative rounded-md shadow-sm">
                <input type="password" name="password-repeat" id="login-password-repeat" autocomplete="password"
                  class="block w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                  v-model="form.passwordRepeat" aria-invalid="true" aria-describedby="password-repeat-error" />
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <ExclamationCircleIcon class="h-5 w-5 text-red-500" aria-hidden="true" />
                </div>
              </div>
              <p class="text-sm text-red-600">{{ $t('validation.requiredField') }}</p>
            </div>
          </div>

          <div class="mt-4 pt-2">
            <button @click="handleLogin" :disabled="loading"
              class="mt-4 flex w-full justify-center rounded-md border border-transparent bg-primary-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
              <LoadingIcon v-if="loading" class="h-5 w-5 text-white" />
              <div class="text-md" v-else>
                {{ $t('views.account.passwordChangeCTA') }}
              </div>
            </button>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup lang="ts">
import router from '@/router'
import { LockClosedIcon } from '@heroicons/vue/24/outline';
import { UserIcon } from '@heroicons/vue/24/outline';
import { ExclamationCircleIcon } from '@heroicons/vue/20/solid'
import { XCircleIcon } from '@heroicons/vue/20/solid';
import { ref } from 'vue'
import LoadingIcon from '@/components/LoadingIcon.vue'

const form = ref({
  passwordOld: null,
  password: null,
  passwordRepeat: null,
})
const error = ref({
  passwordOld: null,
  password: null,
  passwordRepeat: null,
})
const loading = ref(false)

const logout = () => {
  //TODO useUserStore().logout()
  router.push('login')
}
</script>
