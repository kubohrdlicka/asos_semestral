<template>
  <div class="min-h-full bg-gradient-to-br from-white to-gray-100">
    <div class="container mx-auto min-h-screen flex flex-col items-center justify-center pb-20">

      <div class="mx-3 rounded-lg w-full flex justify-center bg-primary-600 text-white py-8 bg-gradient-to-br from-primary-500 to-primary-800">
        <div class="w-full lg:w-3/4">
          <div class="text-7xl pt-4 pb-7 font-bold tracking-wide">{{ $t('views.landing.title') }}</div>
          <div class="text-xl pb-2">{{ $t('views.landing.subtitle') }}</div>
        </div>
      </div>  
    
      <div class="mt-12">
        <router-link to="login">
          <div class="cursor-pointer mt-4 flex w-full justify-center rounded-md border border-transparent bg-primary-500 py-1 px-5 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
            <div class="text-xl">
              {{ $t('views.login.loginCTA') }}
            </div>
          </div>
        </router-link>
      </div>
      <div class="mt-1">
        <router-link to="register">
          <div class="cursor-pointer mt-4 flex w-full justify-center rounded-md border border-transparent bg-gray-300 py-1 px-5 text-sm font-medium text-gray-700 shadow-sm hover:bg-primary-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
            <div class="text-md">
              {{ $t('views.register.registerCTA') }}
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">  
</script>
