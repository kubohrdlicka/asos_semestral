<template>
  <TransitionRoot as="template" :show="open">
    <Dialog class="relative z-10" @close="handleClose">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div
            class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10"
          >
            <TransitionChild
              as="template"
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enter-from="translate-x-full"
              enter-to="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leave-from="translate-x-0"
              leave-to="translate-x-full"
            >
              <DialogPanel class="pointer-events-auto w-screen max-w-md">
                <div class="pt-16" @click="handleClose"></div>
                <div
                  class="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl pt-8"
                >
                  
                <div v-for="(route, i) in navigation" :key="i" class="py-3 px-2 mx-4">
                  <router-link
                    @click="handleClose"
                    :to="route['route']"
                    class="font-medium text-gray-500 hover:text-gray-900"
                    >{{ route['name'] }}</router-link
                  >
                </div>

                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { ref, reactive, defineEmits, type PropType } from 'vue'
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import router from '../../router'

// Props
const props = defineProps({
  open: {
    type: Boolean,
    required: true,
  },
  navigation: {
    required: true,
  }
})

// Emits
const emit = defineEmits<{
  (e: 'close'): void
}>()

// Methods
const handleClose = () => {
  emit('close')
}

</script>
