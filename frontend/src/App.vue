<template>
  <div class="w-full h-full">
    <suspense>
      <component :is="route.meta.layout" v-if="route.meta.layout">
        <router-view :key="key" />
      </component>
      <router-view v-else :key="key" />
      <template #fallback>
        <LoadingLayout />
      </template>
    </suspense>
  </div>
</template>

<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import { reactive, ref } from 'vue'
import LoadingLayout from '@/layout/LoadingLayout.vue'

const route = reactive(useRoute())
const key = ref(route.path)

</script>

<script lang="ts">
// for syncing with router's scroll behavior delay
export const routeTransitionDuration = 150 // in miliseconds
</script>

<style>
@font-face {
  font-family: 'Kanit';
  src: url('/Kanit-Bold.ttf') format('TrueType');
  font-weight: 900;
  font-style: normal;
}
@font-face {
  font-family: 'Kanit';
  src: url('/Kanit-Regular.ttf') format('TrueType');
  font-weight: 600;
  font-style: normal;
}
@font-face {
  font-family: 'Kanit';
  src: url('/Kanit-Light.ttf') format('TrueType');
  font-weight: 300;
  font-style: normal;
}
@font-face {
  font-family: 'Kanit';
  src: url('/Kanit-Thin.ttf') format('TrueType');
  font-weight: 100;
  font-style: normal;
}
body {
  font-family: 'Kanit';
}

/* route transition animation */
.route-enter-from,
.route-leave-to {
  opacity: 0;
}
.route-enter-active,
.route-leave-active {
  transition: opacity var(--transition-duration) ease-out;
}
.firebase-emulator-warning {
  display: none;
}
</style>
