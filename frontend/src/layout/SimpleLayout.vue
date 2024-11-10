<template>
  <div class="flex h-screen w-full flex-col">
    <!--  BASE LAYOUT HEADER - START   -->
    <Header
      v-if="route.name !== 'register' && route.name !== 'login'"
      class="relative z-20 bg-gray-50"
    />
    <!--  BASE LAYOUT HEADER - END   -->
    <main class="relative min-w-[0] flex-grow bg-gray-50">
      <RouterView v-slot="{ Component }">
        <transition
          name="route"
          mode="out-in"
          :style="{
            '--transition-duration': routeTransitionDuration + 'ms'
          }"
        >
          <component :is="Component" :key="route.path" />
        </transition>
      </RouterView>
    </main>
  </div>
</template>

<script setup lang="ts">
import Header from '@/layout/headers/SimpleHeader.vue'
import { RouterView, useRoute } from 'vue-router'
import { reactive } from 'vue'

const route = reactive(useRoute())
</script>

<script lang="ts">
// for syncing with router's scroll behavior delay
export const routeTransitionDuration = 150 // in miliseconds
</script>

<style></style>
