<template>
  <div :class="classes[purpose].background" class="rounded-md p-4">
    <div class="flex">
      <div class="flex-shrink-0" :class="{ 'animate-pulse': pulseIcon }">
        <component
          :is="icons[purpose]"
          class="h-5 w-5"
          :class="[classes[purpose].icon]"
          aria-hidden="true"
        />
      </div>
      <div class="ml-3">
        <h3
          v-if="slots.title"
          class="text-sm font-medium"
          :class="[classes[purpose].title]"
        >
          <slot name="title"></slot>
        </h3>
        <div
          v-if="slots.description"
          class="text-sm"
          :class="[classes[purpose].description, { 'mt-2': slots.title }]"
        >
          <p>
            <slot name="description"></slot>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
// components
import { InfoRound as InfoIcon } from '@vicons/material'
import { ExclamationTriangleIcon as WarningIcon } from '@heroicons/vue/20/solid'
import { XCircleIcon as ErrorIcon } from '@heroicons/vue/20/solid'
import { CheckCircleIcon as SuccessIcon } from '@heroicons/vue/20/solid'

// utils
import { useSlots } from 'vue'

// types
import type { PropType } from 'vue'

type AlertType = 'warning' | 'info' | 'success' | 'error'
type AlertClass = {
  icon: string
  background: string
  title: string
  description: string
}

defineProps({
  purpose: {
    type: String as PropType<AlertType>,
    required: false,
    default: 'info',
  },
  pulseIcon: {
    type: Boolean,
    required: false,
    default: false,
  },
})

const slots = useSlots()

const icons: Record<AlertType, any> = {
  warning: WarningIcon,
  info: InfoIcon,
  success: SuccessIcon,
  error: ErrorIcon,
}

const classes: Record<AlertType, AlertClass> = {
  warning: {
    icon: 'text-yellow-400',
    background: 'bg-yellow-50',
    title: 'text-yellow-800',
    description: 'text-yellow-700',
  },
  info: {
    icon: 'text-blue-400',
    background: 'bg-blue-50',
    title: 'text-blue-800',
    description: 'text-blue-700',
  },
  success: {
    icon: 'text-green-400',
    background: 'bg-green-50',
    title: 'text-green-800',
    description: 'text-green-700',
  },
  error: {
    icon: 'text-red-400',
    background: 'bg-red-50',
    title: 'text-red-800',
    description: 'text-red-700',
  },
}
</script>
