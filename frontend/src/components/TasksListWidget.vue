<template>
  <div>
    <div>Tasks - {{ props.widgetType }}</div>
    <div>list...</div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { TaskWidgetType } from '@/types/task';

const props = defineProps({
  widgetType: {
    type: String as PropType<TaskWidgetType>,
    required: true,
  },
})
</script>
