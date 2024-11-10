<template>
  <div class="w-full h-full">
    <suspense>
      <component :is="route.meta.layout" v-if="route.meta.layout">
        <router-view :key="key" />
      </component>
      <router-view v-else :key="key" />
      <template #fallback>loading</template>
    </suspense>
  </div>
</template>

<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import { reactive, ref } from 'vue'

const route = reactive(useRoute())
const key = ref(route.path)

</script>

<script lang="ts">
// for syncing with router's scroll behavior delay
export const routeTransitionDuration = 150 // in miliseconds
</script>

<style>
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
