<template>
  <div class="flex min-h-full">
    <div class="flex flex-1 w-full flex-col mt-10 pb-12 px-4 sm:px-6 lg:flex-none lg:px-12 xl:px-12">
      
      <div>Taskboard</div>

      <RouterView v-slot="{ Component }">
        <component :is="Component" />
      </RouterView>

    </div>
  </div>
</template>

<script setup lang="ts">  
</script>
