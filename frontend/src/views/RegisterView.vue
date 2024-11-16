<template>
  <div class="w-full bg-primary-800 bg-gradient-to-br from-primary-700 to-primary-900">
    <div class="h-screen w-full flex justify-center items-center">
      
      <div class="w-full md:w-1/2 lg:w-1/3 xl:w-1/6 bg-white mb-24 px-4 py-3 rounded-lg shadow-xl">

        <div class="font-bold text-primary-700 text-4xl mt-2 mb-6">{{ $t('views.register.title') }}</div>

        

        <div class="mt-10">
          <button @click="handleLogin" :disabled="loading" class="mt-4 flex w-full justify-center rounded-md border border-transparent bg-primary-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
            <LoadingIcon
              v-if="loading"
              class="-ml-1 mr-3 h-5 w-5 text-white"
            />
            <div class="text-md">
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
import { XCircleIcon } from '@heroicons/vue/20/solid';
import { ref } from 'vue'
import LoadingIcon from '@/components/LoadingIcon.vue'

const form = ref({
  name: null,
  email: null,
  password: null,
  passwordRepeat: null,
})
const error = ref({
  name: null,
  email: null,
  password: null,
  passwordRepeat: null,
})
const loading = ref(false)

const handleLogin = async () => {
  // TODO: api call to login
}

</script>
