<template>
  <div class="flex min-h-full">
    <div class="flex flex-1 w-full flex-col mt-10 pb-12 px-4 sm:px-6 lg:flex-none lg:px-12 xl:px-12">
      
      <div>Dashboard</div>

      <div class="flex flex-wrap">
        <div class="px-0 py-3 md:p-4 w-full">
          <CalendarWidget />
        </div>
        <div class="px-0 py-3 md:p-4 w-full md:w-1/2 xl:w-1/3">
          <TasksListWidget :widgetType="TaskWidgetType.ALL" />
        </div>
        <div class="px-0 py-3 md:p-4 w-full md:w-1/2 xl:w-1/3">
          <TasksListWidget :widgetType="TaskWidgetType.PERSONAL" />
        </div>
        <div class="px-0 py-3 md:p-4 w-full md:w-1/2 xl:w-1/3">
          <TasksListWidget :widgetType="TaskWidgetType.PLANNED" />
        </div>
        <div class="px-0 py-3 md:p-4 w-full md:w-1/2 xl:w-1/3">
          <TasksListWidget :widgetType="TaskWidgetType.SHARED" />
        </div>
      </div>

      
    </div>
  </div>

  <div class="absolute inset-[0] p-32 z-20 pointer-events-none">
    <!-- plan: blured overlay with detail content-->
    <RouterView v-slot="{ Component }">
      <component :is="Component" />
    </RouterView>
  </div>

  <div class="absolute bottom-[0] right-[0]">
    <!-- plan: fob button for creation -->
    <div>+</div>
  </div>

</template>

<script setup lang="ts">
import { TaskWidgetType } from '@/types/task';
import TasksListWidget from '@/components/TasksListWidget.vue';
import CalendarWidget from '@/components/CalendarWidget.vue';
</script>
