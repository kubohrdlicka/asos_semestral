<template>
  <div
    class="bg-white min-h-full px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8"
  >
    <div class="max-w-max mx-auto">
      <main class="sm:flex">
        <p class="text-4xl font-extrabold text-indigo-600 sm:text-5xl">404</p>
        <div class="sm:ml-6">
          <div class="sm:border-l sm:border-gray-200 sm:pl-6">
            <h1
              class="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl"
            >
              {{ $t('not_found_view.not_found') }}
            </h1>
            <p class="mt-1 text-base text-gray-500">
              {{ $t('not_found_view.description') }}
            </p>
          </div>
          <div
            class="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6"
          >
            <button
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              @click="goBack"
            >
              {{ $t('not_found_view.go_back') }}
            </button>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const goBack = () => {
  router.go(-1)
}
</script>
