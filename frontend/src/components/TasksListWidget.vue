<template>
  <div class="border rounded-md border-gray-300">

    <div class="flex px-3 py-1 rounded-t-md border-b border-gray-300">
      <div class="font-bold text-primary-600 text-2xl capitalize">{{ props.widgetType }}</div>
    </div>

    <div>
      <div v-for="(item, index) in items" :key="index" class="">
        <div class="ps-2 pe-3 py-1 my-1 flex items-center">
          <div class="me-2">
            <div v-if="true" class="w-[30px] h-[30px] text-gray-300 ease-in-out hover:text-primary-500"> <StopIconOutline/> </div>
            <div v-else class="w-[30px] h-[30px] text-primary-700"> <StopIconSolid/> </div>
          </div>
          <div class="mb-1">
            {{ item }}
          </div>
        </div>
        <div v-if="index < items.length - 1" class="border-t mx-3 border-gray-200"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { TaskWidgetType } from '@/types/task';
import { StopIcon as StopIconOutline } from '@heroicons/vue/24/outline';
import { StopIcon as StopIconSolid } from '@heroicons/vue/24/solid';
import { ref } from 'vue'

const items = ref([
  {name: 'A'},
  {name: 'A'},
  {name: 'A'},
  {name: 'A'},
  {name: 'A'},
  {name: 'A'},
])

const props = defineProps({
  widgetType: {
    type: String as PropType<TaskWidgetType>,
    required: true,
  },
})
</script>
