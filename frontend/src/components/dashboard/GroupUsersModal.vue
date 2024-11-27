<template>
  <TransitionRoot as="template" :show="open">
    <Dialog class="relative z-10" @close="closeModal">
      <!-- Background Overlay -->
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-500/75 transition-opacity" />
      </TransitionChild>

      <!-- Modal Panel -->
      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6"
            >
              <div>
                <div class="mt-3 text-center sm:mt-3">
                  <DialogTitle
                    as="h3"
                    class="text-base font-semibold text-gray-900"
                  >
                    Group Users
                  </DialogTitle>
                </div>
              </div>
              <div class="mt-3 sm:mt-3 space-y-6">
                <div class="w-full max-w-xs mx-auto">
                  <div v-for="(user, i) in props.group.members" :key="i" class="flex items-center">
                    <UserIcon class="w-[20px] h-[20px] me-2"/>
                    <p>{{ `${user?.firstName} ${user?.lastName}` }}</p>
                  </div>
                </div>
                <div class="block md:flex justify-between mt-2">
                  <button 
                    @click="emit('close')"
                    class="w-full mt-2 md:w-1/3 flex w-full justify-center rounded-md border border-transparent bg-gray-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                    >
                    Close
                  </button>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { defineEmits, PropType } from 'vue'
import { UserIcon } from '@heroicons/vue/24/outline'
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'

// Props
const props = defineProps({
  open: {
    type: Boolean,
    required: true,
  },
  group: {
    type: Object as PropType<any>,
    required: true,
  },
})

// Emits
const emit = defineEmits<{
  (e: 'close'): void
}>()

// Methods
const closeModal = () => {
  emit('close')
}

</script>
